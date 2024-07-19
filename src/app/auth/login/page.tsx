import RandomOsuHubBackground from "@/app/_components/UI/RandomOsuHubBackground/RandomOsuHubBackground";
import { providerMap, signIn } from "@/server/auth";


export default function SignInPage() {

  return (
    <div className="flex overflow-hidden relative w-full h-full">
      <RandomOsuHubBackground />

      <div
        aria-label="Slate cover background"
        className="absolute left-0 top-0 z-10 flex h-[275%] w-[150%] translate-x-[-70%] translate-y-[-28%] rotate-[22deg] items-center backdrop-blur-3xl bg-zinc-900/40 md:translate-y-[-15%] md:rotate-[11deg]"
      >

      </div>
      <div className="h-dvh z-20 flex w-full items-center justify-center md:ml-[15%] md:w-[22rem]">
        <div className="flex flex-col justify-center items-center w-80 text-xl">
          <h1 className="text-2xl text-white lg:text-9xl drop-shadow-sm font-extrabold tracking-tight sm:text-[5rem]">
            osu! <span className="text-[hsl(280,100%,70%)]">HUB</span>
          </h1>

          <div className="flex flex-col gap-2 p-6 m-8 w-full bg-white rounded shadow-lg">
            {Object.values(providerMap).map((provider) => (
              <form
                className="[&>div]:last-of-type:hidden"
                key={provider.id}
                action={async () => {
                  "use server";
                  await signIn(provider.id, { redirectTo: "/" });

                }}
              >

                <button
                  type="submit"
                  className="flex justify-center items-center px-4 mt-2 space-x-2 w-full h-12 text-base font-light text-white rounded transition focus:ring-2 focus:ring-offset-2 focus:outline-none bg-zinc-800 hover:bg-zinc-900 focus:ring-zinc-800"
                >
                  <span>Sign in with {provider.name}</span>
                </button>
                <div className="flex gap-2 items-center my-4">
                  <div className="flex-1 bg-neutral-300 h-[1px]" />
                  <span className="text-xs leading-4 uppercase text-neutral-500">
                    or
                  </span>
                  <div className="flex-1 bg-neutral-300 h-[1px]" />
                </div>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
