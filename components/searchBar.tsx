import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const FormSchema = z.object({
  city: z.string().min(2, {
    message: "City name must be at least 2 characters.",
  }),
});

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const trimmedCity = data.city.trim();
    if (!trimmedCity) {
      toast({
        title: "Please enter the city name",
        description: "City name cannot be empty",
      });
      return;
    }
    onSearch(trimmedCity);
    form.reset(); // Clear the form input field
    toast({
      title: "Search submitted",
      description: `Searching weather for: ${trimmedCity}`,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full md:w-6/12 h-24 py-20 text-center  mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" md:w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter city name"
                    {...field}
                    className="bg-gray-100 text-lg py-6 focus:outline-none outline-none shadow-teal-400 shadow-inner"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-lg border"
          >
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchBar;
