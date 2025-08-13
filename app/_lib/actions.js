"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function signInAction() {
  return await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  return await signOut({ redirectTo: "/" });
}

export async function updateGuestProfileAction(formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in in order to update your profile!");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const nationalID = formData.get("nationalID");
  //check the national Id validation
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updatedData = { nationality, countryFlag, nationalID };
  const { error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  //revalidate the page
  revalidatePath("/account/profile");
}

export async function deleteReservation(reservationId) {
  const session = await auth();
  if (!session)
    throw new Error(
      "You must be logged in in order to delete this reservation!"
    );

  //more protection on deleting other's bookings
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(reservationId))
    throw new Error("You are not allowed to delete this booking!");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", reservationId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  //revalidate the page
  revalidatePath("/account/reservations");
}

export async function updateReservationAction(formData) {
  const reservationId = Number(formData.get("reservationId"));

  const session = await auth();
  if (!session)
    throw new Error(
      "You must be logged in in order to update your reservation!"
    );

  //more protection on updating a booking
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(reservationId))
    throw new Error("You are not allowed to update this booking!");

  const observations = formData.get("observations").slice(0, 1000);
  const formattedNumGuests = Number(formData.get("numGuests"));

  const updatedData = {
    numGuests: formattedNumGuests,
    observations,
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", reservationId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  //revalidate the page
  revalidatePath(`/account/reservations/edit/${reservationId}`);

  //redirect to the reservations page
  redirect("/account/reservations");
}
