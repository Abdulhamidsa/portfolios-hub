import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface SignInFormInputs {
  email: string;
  password: string;
}

const fetcher = (url: string, data: SignInFormInputs) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();

  const { data, error, mutate } = useSWR<SignInFormInputs | null>(null, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const onSubmit = (formData: SignInFormInputs) => {
    mutate(["/register", formData]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email", { required: "Email is required" })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register("password", { required: "Password is required" })} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Sign In</button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Success: {JSON.stringify(data)}</p>}
    </form>
  );
}

export default SignInForm;
