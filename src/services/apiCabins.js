import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("error");
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// export async function createEditCabin(newCabin, id) {
//   const hasImagePath = newCabin.image?.startWith?.(supabaseUrl);

//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );

//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   // https://wgipmqileekaykfvgqaw.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg?t=2024-01-12T19%3A40%3A55.655Z

//   // 1. Create/edit Cabin
//   let query = supabase.from("cabins");

//   // A) CREATE
//   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

//   // B) EDIT
//   if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.error("error from apiCabins.js in createEditCabin function");
//     throw new Error("Cabins could not be created");
//   }

//   // 2. Upload Image
//   if (hasImagePath) return data;

//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   // 3. Delete the cabin if there was an error uploading image
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error(
//       "Cabins image could not be uploaded and the cabin was not created"
//     );
//   }

//   return data;
// }

export async function createEditCabin(newCabin, editId) {
  const isEditSession = Boolean(editId);
  const hasImagePath = Boolean(typeof newCabin.image === "string");

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create or edit the cabin
  let query = supabase.from("cabins");
  const newImage = hasImagePath ? newCabin.image : imagePath;

  if (isEditSession)
    query = query.update({ ...newCabin, image: newImage }).eq("id", editId);
  if (!isEditSession) query = query.insert([{ ...newCabin, image: newImage }]);

  const { data, error } = await query.select().single();
  console.log(data);

  if (error) {
    console.log(error);
    throw new Error(
      `Cabin could not be ${isEditSession ? "edited" : "created"}!`
    );
  }

  // 2) Upload the image if it isn't already uploaded
  if (hasImagePath) return data;

  const { error: errorImage } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (errorImage) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.log(error);
    throw new Error("Image could not be uploaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("error");
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
