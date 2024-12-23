import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Replaces deprecated HttpClientModule
    ...appConfig.providers  // Keep your existing appConfig
  ]
})
.catch((err) => console.error(err));
