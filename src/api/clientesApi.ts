import { queryOptions } from '@tanstack/react-query'
import { invoke } from '@tauri-apps/api'
import { Cliente } from '../models/Cliente'

export const buscarClientes = queryOptions<Cliente[]>({
  queryKey: ['clientes'],
  queryFn: () => invoke('buscar_todos_clientes_controller'),
})

export const buscarClientePorId = async (clienteId: number): Promise<Cliente> =>
  await invoke('buscar_cliente_por_id_controller', { clienteId })

export const cadastrarClienteApi = async (cliente: Cliente) =>
  await invoke('salvar_cliente_controller', { cliente: cliente })

export const atualizarClienteApi = async (cliente: Cliente) =>
  await invoke('atualizar_cliente_controller', { cliente: cliente })

export const removerClienteApi = async (clienteId: number | null) =>
  await invoke('remover_cliente_controller', { clienteId })
