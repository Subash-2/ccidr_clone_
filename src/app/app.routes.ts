import { Routes } from '@angular/router';
import { UserComponent } from './features/user/user.component';
import { HomeComponent } from './features/user/pages/home/home.component';
import { AboutusComponent } from './features/user/pages/aboutus/aboutus.component';
import { HighlightsComponent } from './features/user/pages/highlights/highlights.component';
import { ContactusComponent } from './features/user/pages/contactus/contactus.component';
import { BlogComponent } from './features/user/pages/blog/blog.component';
import { EventsComponent } from './features/user/pages/events/events.component';
import { InfrastructureComponent } from './features/user/pages/infrastructure/infrastructure.component';
import { TrainingComponent } from './features/user/pages/training/training.component';
import { ResourceComponent } from './features/user/pages/resource/resource.component';
import { ResearchComponent } from './features/user/pages/research/research.component';
import { InternshipComponent } from './features/user/pages/internship/internship.component';
import { BeneficiaryComponent } from './features/user/pages/beneficiary/beneficiary.component';
import { TestimonialsComponent } from './features/user/components/testimonials/testimonials.component';

export const routes: Routes = [

    {
        path: 'user',
        component: UserComponent,
        children: [
          { path: 'home',component: HomeComponent},
          { path:'about-us',component:AboutusComponent },
          {path:'highlights',component:HighlightsComponent},
          {path:'blog',component:BlogComponent},
          {path:'events',component:EventsComponent},
          {path:'training',component:TrainingComponent},
          {path:'resource',component:ResourceComponent},
          {path:'research',component:ResearchComponent},
          {path:'infrastructure',component:InfrastructureComponent},
          {path:'contact-us',component:ContactusComponent},
          {path:'internship',component:InternshipComponent},
          {path:'beneficiary',component:BeneficiaryComponent},
          {path:'test',component:TestimonialsComponent}
        ],
      },
    {path:'user',component:UserComponent},
    {path:'',pathMatch:'full',redirectTo:'user/home'},
    {path:'**',pathMatch:'full',redirectTo:'user/home'}

];



   
  
     

