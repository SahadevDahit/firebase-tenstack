"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { formSchema, initialValues } from "@/components/schemas/signInSchema";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import {
  Button,
  Input,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/index";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import {
  twitterLogin,
  facebookLogin,
  githubLogin,
  googleLogin,
  signIn,
} from "@/api/signin-auth";
import { user } from "@/types/user";

interface loginToggle {
  toggleSignIn: () => void;
}

const SignIn: React.FC<loginToggle> = ({ toggleSignIn }) => {
  const form = useForm<user>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues as user,
  });

  const onSubmit: SubmitHandler<user> = async (values) => {
    await signIn(values);
  };

  return (
    <>
      <h4 className="text-center text-stone font-bold">Sign In</h4>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="text-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-2">
            <p
              className="text-end text-stone cursor-pointer hover:text-blue-500 hover:underline"
              onClick={() => toggleSignIn()}
            >
              Create a new account !!!
            </p>
            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </Form>
      <div className="flex flex-col gap-2">
        <Button
          onClick={async () => {
            await googleLogin();
          }}
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Sign In with Google
        </Button>
        <Button
          onClick={async () => {
            await githubLogin();
          }}
        >
          <FontAwesomeIcon icon={faGithub} className="mr-2" />
          Sign In with Github
        </Button>
        <Button
          onClick={async () => {
            await facebookLogin();
          }}
        >
          <FontAwesomeIcon icon={faFacebook} className="mr-2" />
          Sign In with Facebook
        </Button>
        <Button
          onClick={async () => {
            await twitterLogin();
          }}
        >
          <FontAwesomeIcon icon={faTwitter} className="mr-2" />
          Sign In with Twitter
        </Button>
      </div>
    </>
  );
};

export default SignIn;
