import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard";
import { Evaluacion } from "./pages/evaluacion/evaluacion";
import { PendingEvaluationsComponent } from "./pages/evaluacion/pending-evaluations/pending-evaluations";
import { EvaluationHistoryComponent } from "./pages/evaluacion/evaluation-history/evaluation-history";
import { GestionHabilidadesComponent } from "./pages/gestion-habilidades/gestion-habilidades";
import { Login } from "./pages/login/login";
import { authGuard } from "./core/guards/auth-guard";

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'evaluacion',
        component: Evaluacion,
        children: [
          { path: 'nueva', component: PendingEvaluationsComponent },
          { path: 'historial', component: EvaluationHistoryComponent },
          { path: '', redirectTo: 'nueva', pathMatch: 'full' }
        ]
      },
      // 💡 Cambiado a 'gestion' para que coincida con el error que te salía
      { path: 'gestion-habilidades', component: GestionHabilidadesComponent },
      { path: '', redirectTo: 'evaluacion', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
