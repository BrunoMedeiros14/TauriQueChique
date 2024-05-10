import { queryOptions } from "@tanstack/react-query";
import { Cliente } from "../models/Cliente";

export const buscarClientes = queryOptions({
  queryKey: ["clientes"],
  queryFn: () => Promise.resolve([]) //window.apiCliente.buscarTodosClientes(),
});

export const buscarClientePorId = async (clienteId: number): Promise<Cliente> =>
  Promise.resolve({ dataNascimento: new Date(), email: "", endereco: "", nome: "", telefone: "", id: 1 }) //await window.apiCliente.buscarClientePorId(clienteId)

export const cadastrarClienteApi = async (cliente: Cliente) =>
  Promise.resolve({}) //await window.apiCliente.criarCliente(cliente);

export const atualizarClienteApi = async (cliente: Cliente) =>
  Promise.resolve({})
// await window.apiCliente.editarCliente(cliente);

export const removerClienteApi = async (clienteId: number | null) =>
  Promise.resolve({})// await window.apiCliente.removerCliente(clienteId);
