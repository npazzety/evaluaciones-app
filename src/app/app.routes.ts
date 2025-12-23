import { Routes } from "@angular/router";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Evaluacion } from "./pages/evaluacion/evaluacion";
import { GestionHabilidades } from "./pages/gestion-habilidades/gestion-habilidades";
import { Login } from "./pages/login/login";

// app.routes.ts modificado temporalmente
export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    // Comenta o quita la línea de canActivate temporalmente
    children: [
      { path: 'evaluacion', component: Evaluacion },
      { path: 'gestion', component: GestionHabilidades },
      { path: '', redirectTo: 'evaluacion', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
