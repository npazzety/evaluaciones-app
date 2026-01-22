import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard";
import { Evaluacion } from "./pages/evaluation/evaluation";
import { PendingEvaluationsComponent } from "./pages/evaluation/pending-evaluations/pending-evaluations";
import { EvaluationHistoryComponent } from "./pages/evaluation/evaluation-history/evaluation-history";
import { GestionHabilidadesComponent } from "./pages/skills-managament/skills-managament";
import { Login } from "./pages/login/login";
import { ProfileComponent } from "./pages/profile/profile";
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
      { path: 'gestion', component: GestionHabilidadesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'evaluacion', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
