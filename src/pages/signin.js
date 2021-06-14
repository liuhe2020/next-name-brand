import Head from "next/head";
import { getProviders, signIn, getSession } from "next-auth/client";

export default function SignIn({ providers }) {
  return (
    <>
      <Head>
        <title>Sign In | Name Brand</title>
        <meta name="description" content="Name Brand Sign In" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="max-w-md mx-auto text-center px-5 py-20 mb-20 sm:px-16 sm:py-20">
        <div className="sm:bg-gray-50 m-10 py-20 sm:border sm:border-gray-200 sm:rounded-3xl">
          <h1 className="pb-20 text-xl font-semibold">
            Sign in to your Name Brand Account
          </h1>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id)}
                className="bg-black hover:bg-gray-700 text-white font-bold pt-1.5 pb-2.5 px-5 rounded-full transition-all"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // get user credentials
  const session = await getSession(context);

  // redirect to sign in page if not signed in
  if (session)
    return {
      redirect: { destination: "/account", permanent: false },
      props: {},
    };

  const providers = await getProviders();
  return {
    props: { providers },
  };
}
