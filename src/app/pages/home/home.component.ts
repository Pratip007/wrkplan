import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HeroData {
  headline: string;
  subheadline: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
  additionalLink: string;
  image: string;
  bulletPoints: string[];
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentTab = 'dcaa-compliance';
  currentHeroData: HeroData = {
    headline: '',
    subheadline: '',
    description: '',
    primaryButton: '',
    secondaryButton: '',
    additionalLink: '',
    image: '',
    bulletPoints: []
  };
  private autoRotateInterval: any;
  private progressInterval: any;
  progressBarHeight = 100; // Percentage height
  private sectionDuration = 8000; // 8 seconds in milliseconds
  private progressUpdateInterval = 50; // Update every 50ms for smooth animation
  private startTime = Date.now();

  // Hero content data
  private heroData: { [key: string]: HeroData } = {
    'dcaa-compliance': {
      headline: 'DCAA compliance keeping you up at night?',
      subheadline: 'WRKPLAN\'s purpose-built ERP eliminates the guesswork from government contracting.',
      description: 'Built for government contractors requiring DCAA compliance. Get paid faster, stay audit ready.',
      primaryButton: 'Schedule Your Demo',
      secondaryButton: 'See Compliance Features',
      additionalLink: 'Read our blog: How SYSTOLIC Inc. achieved 94% faster invoicing',
      image: '/assects/home/hero/US-Washington-DC.webp',
      bulletPoints: [
        'Pre-configured chart of accounts and indirect cost pools',
        'Automated cost segregation and audit trails',
        'Real-time compliance monitoring and alerts'
      ]
    },
    'contract-management': {
      headline: 'Take the complexity out of contract management',
      subheadline: 'Reduce the friction of managing multiple government contracts with different requirements.',
      description: 'Manage every aspect of your government contracts in one integrated platform.',
      primaryButton: 'Watch Contract Demo',
      secondaryButton: 'Read Contract Guide',
      additionalLink: 'See how Garcia Information Systems transformed their operations',
      image: '/assects/home/hero/AdobeStock_835753807.jpeg',
      bulletPoints: [
        'Integrate multiple contract types (CPFF, T&M, Fixed Price)',
        'Collaborate across teams with real-time funding visibility',
        'Streamline CLIN management and modification tracking'
      ]
    },
    'project-accounting': {
      headline: 'Accelerate your ROI<br>with WRKPLAN',
      subheadline: 'Transform manual billing into automated accuracy.',
      description: 'Simplify processes and control costs with our integrated platform. Streamline your financial operations with real-time insights and automated reporting capabilities.',
      primaryButton: 'Talk to Sales',
      secondaryButton: 'Learn More',
      additionalLink: 'See WRKPLAN ERP demos',
      image: '/assects/home/hero/AdobeStock_974539324.jpeg',
      bulletPoints: [
        'Automated cost ledger creation',
        'Government invoice generation in minutes',
        'Live P&L by project'
      ]
    }
  };

  ngOnInit() {
    // Set initial content
    this.updateHeroContent('dcaa-compliance');

    // Start auto-rotation and progress bar
    this.startAutoRotation();
    this.startProgressBar();
  }

  ngOnDestroy() {
    // Clean up intervals when component is destroyed
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  switchTab(tabKey: string) {
    this.currentTab = tabKey;
    this.updateHeroContent(tabKey);
    this.resetProgressBar();
  }

  private updateHeroContent(tabKey: string) {
    this.currentHeroData = this.heroData[tabKey];
  }

  private startAutoRotation() {
    const tabKeys = ['dcaa-compliance', 'contract-management', 'project-accounting'];
    let currentIndex = 0;

    this.autoRotateInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % tabKeys.length;
      this.switchTab(tabKeys[currentIndex]);
    }, this.sectionDuration);
  }

  private startProgressBar() {
    this.progressInterval = setInterval(() => {
      const elapsed = Date.now() - this.startTime;
      const progress = (elapsed / this.sectionDuration) * 100;

      // Ensure progress bar decreases from 100% to 0% consistently
      this.progressBarHeight = Math.max(0, 100 - progress);

      // Reset when progress bar reaches 0
      if (this.progressBarHeight <= 0) {
        this.resetProgressBar();
      }
    }, this.progressUpdateInterval);
  }

  private resetProgressBar() {
    this.progressBarHeight = 100;
    this.startTime = Date.now();
  }

  getProgressBarHeight(tabKey: string): string {
    // Only show progress bar for the currently active tab
    if (this.currentTab === tabKey) {
      return `${this.progressBarHeight}%`;
    }
    // Return 0% for inactive tabs to ensure clean state
    return '0%';
  }
}
