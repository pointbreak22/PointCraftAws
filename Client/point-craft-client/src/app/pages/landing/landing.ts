import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CaseStudiesSection } from '../../components/case-studies-section/case-studies-section';
import { ContactSection } from '../../components/contact-section/contact-section';
import { HeroSection } from '../../components/hero-section/hero-section';
import { ProcessSection } from '../../components/process-section/process-section';
import { ServicesGrid } from '../../components/services-grid/services-grid';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { SiteHeader } from '../../components/site-header/site-header';
import { TechStackSection } from '../../components/tech-stack-section/tech-stack-section';

@Component({
  selector: 'app-landing',
  imports: [
    SiteHeader,
    HeroSection,
    ServicesGrid,
    TechStackSection,
    ProcessSection,
    CaseStudiesSection,
    ContactSection,
    SiteFooter,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {}
