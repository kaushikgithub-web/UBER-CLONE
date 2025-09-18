import { SignIn } from '@clerk/nextjs'
import Image from 'next/image';

export default function Page() {
  return(

    <>
    <div className="relative w-full max-w-full">
  <Image
    src="/cabzy banner.jpg"
    alt="Cabzy Banner"
    width={900}
    height={1000}
    className="w-full h-auto object-cover"
    priority
  />
  <div className="absolute top-5 right-5 md:top-10 md:right-10">
    <SignIn
     path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl="/ride"
     />
  </div>
</div>

 </>


  );
}