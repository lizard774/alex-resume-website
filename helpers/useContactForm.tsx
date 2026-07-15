import { useMutation } from "@tanstack/react-query";
import { postContact, InputType, OutputType } from "../endpoints/contact_POST.schema";

export const useContactForm = () => {
  return useMutation<OutputType, Error, InputType>({
    mutationFn: (data: InputType) => postContact(data),
  });
};