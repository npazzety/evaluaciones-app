import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth-guard";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Evaluacion } from "./pages/evaluacion/evaluacion";
import { GestionHabilidades } from "./pages/gestion-habilidades/gestion-habilidades";
import { Login } from "./pages/login/login";

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      { path: 'evaluacion', component: Evaluacion, canActivate: [authGuard] }, // Agregado aquí
      { path: 'gestion', component: GestionHabilidades, canActivate: [authGuard] }, // Agregado aquí
      { path: '', redirectTo: 'evaluacion', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
