import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Replaces deprecated HttpClientModule
    ...appConfig.providers  // Keep your existing appConfig
  ]
})
.catch((err) => console.error(err));
