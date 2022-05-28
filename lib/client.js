import  SanityClient  from "@sanity/client";
import imageUrlBuilder  from "@sanity/image-url";

export const client = SanityClient({
    projectId :'t9ubhwjn',
    dataset : 'production',
    apiVersion : '2022-05-28',
    useCdn : 'true',
    token : process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);