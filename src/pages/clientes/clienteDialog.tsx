import {
  atualizarClienteApi,
  buscarClientePorId,
  cadastrarClienteApi,
} from "@/api/clientesApi";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Cliente } from "@/models/Cliente";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { gerarStringPorDate } from '@/utils/conversores';
import { zodResolver } from "@hookform/resolvers/zod";
import { InputComMascara } from "../../components/input-com-mascara";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { gerarDatePorString } from "../../utils/conversores";

const formSchema = z.object({
  nome: z.string({ message: "Campo obrigatório." }).min(3, {
    message: "Nome deve conter pelo menos 3 letras",
  }),
  celular: z
    .string({ message: "Campo obrigatório." })
    .regex(/^[(]?[0-9]{2}[)][-\s]?[9][-\s][0-9]{4}[-\s][0-9]{4}$/, {
      message: "Número de celular invalido.",
    }),
  email: z
    .string({ message: "Campo obrigatório" })
    .min(1, { message: "Favor preencher este campo" })
    .email("Esse email não é invalido"),
  dataNascimento: z.string(),
  endereco: z.string(),
});

const gerarFormVazio = () =>
  useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataNascimento: "",
      email: "",
      endereco: "",
      nome: "",
      celular: "",
    },
  });

export function DialogCadastrarCliente({ isOpen }: { isOpen: boolean }) {
  const queryClient = useQueryClient();

  const refBtnClose = useRef<HTMLButtonElement>(null);

  const cadastrarClienteMutation = useMutation({
    mutationFn: cadastrarClienteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      refBtnClose.current?.click();
    },
  });

  const form = gerarFormVazio();

  useEffect(() => {
    if (isOpen) {
      form.setValue("dataNascimento", "");
      form.setValue("email", "");
      form.setValue("endereco", "");
      form.setValue("nome", "");
      form.setValue("celular", "");
    }
  }, [isOpen]);

  function onSubmit({
    nome,
    dataNascimento,
    email,
    celular,
    endereco,
  }: z.infer<typeof formSchema>) {
    const cliente: Cliente = {
      nome,
      dataNascimento: gerarDatePorString(dataNascimento),
      email,
      telefone: celular,
      endereco,
    };
    console.log(cliente);
    cadastrarClienteMutation.mutate(cliente);
  }

  return (
    <DialogContent className="sm:max-w-[32rem]">
      <DialogHeader>
        <DialogTitle>Cadastrar cliente</DialogTitle>
        <DialogDescription>
          Insira abaixo os dados do cliente.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-3"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome*</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome Sobrenome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="celular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular*</FormLabel>
                  <FormControl>
                    <InputComMascara
                      radix="."
                      mask={"(00) 0 0000-0000"}
                      placeholder="(00) 0 0000-0000"
                      {...field}
                    />
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
                  <FormLabel>E-mail*</FormLabel>
                  <FormControl>
                    <Input placeholder="email@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataNascimento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <InputComMascara
                      radix="."
                      mask={"00/00/0000"}
                      unmask={true}
                      placeholder="dd/mm/aaaa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, número, bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="hidden" type="submit"></Button>
          </form>
        </Form>
      </div>
      <DialogFooter>
        <Button onClick={form.handleSubmit(onSubmit)} type="submit">
          Cadastrar Cliente
        </Button>
        <DialogClose asChild>
          <Button ref={refBtnClose} type="button" variant="destructive">
            Cancelar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

export function DialogAtualizarCliente({
  clienteId,
}: {
  clienteId?: number | null;
}) {
  const queryClient = useQueryClient();

  const refBtnClose = useRef<HTMLButtonElement>(null);

  const atualizarClienteMutation = useMutation({
    mutationFn: atualizarClienteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      refBtnClose.current?.click();
    },
  });

  const form = gerarFormVazio();

  function onSubmit({
    nome,
    dataNascimento,
    email,
    celular,
    endereco,
  }: z.infer<typeof formSchema>) {
    const cliente: Cliente = {
      id: Number(clienteId),
      nome,
      dataNascimento: gerarDatePorString(dataNascimento),
      email,
      telefone: celular,
      endereco,
    };
    atualizarClienteMutation.mutate(cliente);
  }

  useEffect(() => {
    if (clienteId) {
      buscarClientePorId(clienteId).then(
        ({ dataNascimento, email, endereco, nome, telefone }): void => {
          form.setValue("dataNascimento", gerarStringPorDate(dataNascimento));
          form.setValue("email", email);
          form.setValue("endereco", endereco ?? "");
          form.setValue("nome", nome);
          form.setValue("celular", telefone);
        }
      );
    }
  }, [clienteId]);

  return (
    <DialogContent className="sm:max-w-[32rem]">
      <DialogHeader>
        <DialogTitle>Atualizar Cliente {form.getValues().nome}</DialogTitle>
        <DialogDescription>
          Insira abaixo os dados atualizados do cliente.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-3"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome*</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome Sobrenome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="celular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular*</FormLabel>
                  <FormControl>
                    <InputComMascara
                      radix="."
                      mask={"(00) 0 0000-0000"}
                      placeholder="(00) 0 0000-0000"
                      {...field}
                    />
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
                  <FormLabel>E-mail*</FormLabel>
                  <FormControl>
                    <Input placeholder="email@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataNascimento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <InputComMascara
                      radix="."
                      mask={"00/00/0000"}
                      unmask={true}
                      placeholder="dd/mm/aaaa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Rua, número, bairro"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="hidden" type="submit"></Button>
          </form>
        </Form>
      </div>
      <DialogFooter>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="bg-blue-500"
          type="submit"
        >
          Atualizar Cliente
        </Button>
        <DialogClose asChild>
          <Button ref={refBtnClose} type="button" variant="destructive">
            Cancelar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
