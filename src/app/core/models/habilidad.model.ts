export interface Habilidad {
  id: number;
  nombre: string;
  tipo: 'Tecnica' | 'Blanda';
  activa: boolean;
  notaEmpleado?: number; // Lo que el empleado se pone
  notaJefe?: number;     // Lo que el jefe le pone
  bloqueada?: boolean;   // Se bloquea cuando ambos terminan
}
