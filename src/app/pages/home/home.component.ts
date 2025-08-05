import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  currentTab = 'dcaa-compliance';
      currentSolutionsTab = 'overview';
  expandedSections: { [key: string]: boolean } = {};

  // Video section properties
  currentVideoCategory = 'federal';
  videoCategoryData: { [key: string]: any } = {
    federal: {
      title: "Accelerating compliance & driving growth",
      description: "Discover how <strong>SYSTOLIC Inc</strong>, a fast-growing government contractor, adopted WrkPlan's intuitive Cloud platform to empower finance teams, drive business growth and increase DCAA compliance.",
      videoTime: "3:24",
      backgroundImage: "url('/placeholder.svg?height=600&width=1200&text=Government+Building+Skyline+with+Light+Trails')"
    },
    defense: {
      title: "Securing defense contracts with confidence",
      description: "Learn how <strong>Garcia Information Systems</strong>, a leading defense contractor, streamlined their operations with WrkPlan's integrated platform to manage complex security clearance requirements and multi-year contracts.",
      videoTime: "4:12",
      backgroundImage: "url('/placeholder.svg?height=600&width=1200&text=Defense+Facility+with+Security+Elements')"
    },
    consulting: {
      title: "Transforming consulting operations",
      description: "See how <strong>Federal Consulting Group</strong> leveraged WrkPlan's project accounting capabilities to improve billing accuracy, reduce administrative overhead, and accelerate cash flow.",
      videoTime: "2:58",
      backgroundImage: "url('/placeholder.svg?height=600&width=1200&text=Modern+Office+Building+Consulting')"
    }
  };

  get currentVideoData() {
    return this.videoCategoryData[this.currentVideoCategory];
  }

  constructor(private sanitizer: DomSanitizer) {}
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

  // Solutions tab data
  solutionsTabData: { [key: string]: any } = {
    overview: {
      description: 'Improve the efficiency and productivity of your government contracting organization and transform your team\'s work with <strong>modern Cloud software solutions</strong> built on the <strong style="color: #0a182e;">DCAA-compliant WrkPlan Platform</strong>.',
      sections: [
        {
          id: 'overview-erp',
          title: 'WrkPlan Government Contractor ERP',
          description: 'Flexible and modular ERP capabilities that help you align your Finance, Operations and Compliance teams through a single source of truth. Empower your people and prepare for the future with an ERP that adapts as your organization evolves.'
        },
        {
          id: 'overview-dcaa',
          title: 'WrkPlan DCAA Compliance & Audit Support',
          description: 'Built-in compliance features ensure your accounting system meets all federal requirements with automated cost segregation and audit trails.'
        },
        {
          id: 'overview-contracts',
          title: 'WrkPlan Contract Management Suite',
          description: 'Manage multiple government contracts with different requirements, funding sources, and compliance needs in one integrated platform.'
        },
        {
          id: 'overview-accounting',
          title: 'WrkPlan Project Accounting & Billing',
          description: 'Fully integrated project accounting with finance, procurement and payroll for clear financial visibility across all projects.'
        },
        {
          id: 'overview-time',
          title: 'WrkPlan Time & Expense Management',
          description: 'DCAA-compliant timesheets with mobile accessibility and supervisor approval workflows integrated with payroll and project accounting.'
        },
        {
          id: 'overview-invoicing',
          title: 'WrkPlan Government Invoicing Automation',
          description: 'Automated SF-1034/1035 invoice generation with built-in compliance features for faster government payment processing.'
        }
      ],
      video: '/assects/home/Solutions Overview/erp overview.mp4',
      image: '/assects/home/hero/erpDashboard.jpg'
    },
    contracts: {
      description: 'Gain full control and visibility of all your contracts with an easy-to-use, all-in-one solution.',
      sections: [
        {
          id: 'contracts-management',
          title: 'Contract Management',
          description: 'Gain full control and visibility of all your contracts with an easy-to-use, all-in-one solution.'
        },
        {
          id: 'contracts-purchasing',
          title: 'Purchasing and Inventory',
          description: 'Streamline procurement processes and manage inventory efficiently across all your government contracts.'
        },
        {
          id: 'contracts-opportunity',
          title: 'Opportunity Management',
          description: 'Track and manage business opportunities from initial identification through contract award.'
        }
      ],
      image: '/assects/home/Solutions Overview/contract management.webp'
    },
    finance: {
      description: 'Manage your transactions, costs, and revenue in one fully-integrated system.',
      sections: [
        {
          id: 'finance-project',
          title: 'Project Accounting',
          description: 'Comprehensive project accounting with real-time cost tracking, revenue recognition, and financial reporting across all government contracts.'
        },
        {
          id: 'finance-rates',
          title: 'Indirect Rates',
          description: 'Automated indirect rate calculations and management to ensure DCAA compliance and accurate cost allocation.'
        },
        {
          id: 'finance-incurred',
          title: 'Incurred Cost Submission',
          description: 'Streamlined preparation and submission of incurred cost proposals with built-in compliance features.'
        },
        {
          id: 'finance-budgeting',
          title: 'Budgeting and Forecasting',
          description: 'Advanced budgeting and forecasting tools with scenario planning and variance analysis for better financial control.'
        }
      ],
      image: '/assects/home/Solutions Overview/finance management.png'
    },
    workforce: {
      description: 'Manage timesheets and expenses, as well as sub-contractors, in compliance with DCAA.',
      sections: [
        {
          id: 'workforce-time',
          title: 'Time and Expense',
          description: 'DCAA-compliant time tracking and expense management with mobile accessibility and supervisor approval workflows.'
        },
        {
          id: 'workforce-payroll',
          title: 'Payroll Integration',
          description: 'Seamless integration with payroll systems for accurate time and expense processing and reporting.'
        },
        {
          id: 'workforce-employee',
          title: 'Employee Management',
          description: 'Comprehensive employee management with performance tracking, skill management, and compliance monitoring.'
        },
        {
          id: 'workforce-subcontractor',
          title: 'Sub-Contractor Management',
          description: 'Streamlined subcontractor management with performance tracking, compliance monitoring, and payment processing.'
        }
      ],
      image: '/assects/home/Solutions Overview/workforse management.png'
    }
  };

  // Hero content data
  private heroData: { [key: string]: HeroData } = {
    'dcaa-compliance': {
      headline: 'DCAA Compliance Keeping You Up at Night?',
      subheadline: 'WrkPlan\'s purpose-built ERP eliminates the guesswork from government contracting.',
      description: 'Built for government contractors requiring DCAA compliance. Get paid faster, stay audit ready.',
      primaryButton: 'Schedule Your Demo',
      secondaryButton: 'See Compliance Features',
      additionalLink: 'Read our blog: How SYSTOLIC Inc. achieved 94% faster invoicing',
      image: '/assects/home/hero/dc.jpg',
      bulletPoints: [
        'Pre-configured chart of accounts and indirect cost pools',
        'Automated cost segregation and audit trails',
        'Real-time compliance monitoring and alerts'
      ]
    },
    'contract-management': {
      headline: 'Take the Complexity Out of Contract Management',
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
    'workforce-management': {
      headline: 'Streamline Your Workforce<br>Management',
      subheadline: 'DCAA-compliant time tracking and employee management.',
      description: 'Manage timesheets, expenses, and subcontractors in compliance with DCAA requirements. Streamline your workforce operations with integrated payroll and performance tracking.',
      primaryButton: 'Schedule Demo',
      secondaryButton: 'See Workforce Features',
      additionalLink: 'Read our blog: How SYSTOLIC Inc. achieved 94% faster invoicing',
      image: '/assects/home/hero/AdobeStock_974539324.jpeg',
      bulletPoints: [
        'DCAA-compliant time tracking and expense management',
        'Seamless payroll integration and employee management',
        'Comprehensive subcontractor oversight and compliance'
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

  ngAfterViewInit() {
    // Ensure video plays after view is initialized
    setTimeout(() => {
      this.ensureVideoPlays();
    }, 100);

    // Try playing video immediately and repeatedly
    this.forceVideoPlayOnLoad();

    // Add touch/swipe support for mobile
    setTimeout(() => {
      this.setupTouchSupport();
    }, 100);

    // Add click listener to play video on any user interaction
    document.addEventListener('click', this.playVideoOnClick.bind(this), { once: true });
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

  switchSolutionsTab(tabKey: string) {
    this.currentSolutionsTab = tabKey;
    // Clear expanded sections when switching tabs
    this.expandedSections = {};

    // Ensure video plays when Overview tab is selected
    if (tabKey === 'overview') {
      this.ensureVideoPlays();
    }
  }

  toggleSection(sectionId: string) {
    this.expandedSections[sectionId] = !this.expandedSections[sectionId];
  }

  isSectionExpanded(sectionId: string): boolean {
    return !!this.expandedSections[sectionId];
  }

  getSanitizedDescription(tabKey: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.solutionsTabData[tabKey].description);
  }

  private updateHeroContent(tabKey: string) {
    this.currentHeroData = this.heroData[tabKey];
  }

  private startAutoRotation() {
    const tabKeys = ['dcaa-compliance', 'contract-management', 'workforce-management'];
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

  switchVideoCategory(categoryKey: string) {
    this.currentVideoCategory = categoryKey;
  }

  playVideo() {
    alert('Video would play here - integrate with your video player of choice');
  }

  onVideoLoaded(event: any) {
    const video = event.target as HTMLVideoElement;
    this.forceVideoPlay(video);
  }

  onVideoCanPlay(event: any) {
    const video = event.target as HTMLVideoElement;
    this.forceVideoPlay(video);
  }

  private forceVideoPlay(video: HTMLVideoElement) {
    if (video && this.currentSolutionsTab === 'overview') {
      // Set video properties
      video.muted = true;
      video.autoplay = true;
      video.loop = true;

      video.play().catch(e => {
        console.log('Video play attempt failed:', e);
        // Try again after a short delay
        setTimeout(() => {
          video.play().catch(e2 => console.log('Second video play attempt failed:', e2));
        }, 200);
      });
    }
  }

  private forceVideoPlayOnLoad() {
    // Try multiple times with different intervals
    const intervals = [50, 100, 200, 500, 1000, 2000];

    intervals.forEach(delay => {
      setTimeout(() => {
        const video = document.querySelector('video') as HTMLVideoElement;
        if (video && this.currentSolutionsTab === 'overview') {
          this.forceVideoPlay(video);
        }
      }, delay);
    });
  }

  playVideoOnClick() {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video && this.currentSolutionsTab === 'overview') {
      this.forceVideoPlay(video);
    }
  }

  private ensureVideoPlays() {
    // Try multiple times with different delays
    const attempts = [100, 300, 500, 1000];

    attempts.forEach(delay => {
      setTimeout(() => {
        const video = document.querySelector('video') as HTMLVideoElement;
        if (video && this.currentSolutionsTab === 'overview') {
          this.forceVideoPlay(video);
        }
      }, delay);
    });

    // Set up interval to ensure video keeps playing
    setInterval(() => {
      const video = document.querySelector('video') as HTMLVideoElement;
      if (video && video.paused && this.currentSolutionsTab === 'overview') {
        this.forceVideoPlay(video);
      }
    }, 2000);
  }

  // Carousel functionality for insights section
  currentInsightsPage = 0;
  totalInsightsPages = 5;

  goToInsightsPage(page: number) {
    if (page >= 0 && page < this.totalInsightsPages) {
      this.currentInsightsPage = page;
      this.updateInsightsCarousel();
    }
  }

  nextInsightsPage() {
    if (this.currentInsightsPage < this.totalInsightsPages - 1) {
      this.goToInsightsPage(this.currentInsightsPage + 1);
    }
  }

  prevInsightsPage() {
    if (this.currentInsightsPage > 0) {
      this.goToInsightsPage(this.currentInsightsPage - 1);
    }
  }

    private updateInsightsCarousel() {
    const container = document.getElementById('cards-container');
    if (container) {
      const translateX = -this.currentInsightsPage * 100;
      container.style.transform = `translateX(${translateX}%)`;
    }
  }



  private setupTouchSupport() {
    const container = document.getElementById('cards-container');
    if (container) {
      let startX = 0;
      let endX = 0;

      container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });

      container.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
          if (diff > 0) {
            this.nextInsightsPage(); // Swipe left - go to next page
          } else {
            this.prevInsightsPage(); // Swipe right - go to previous page
          }
        }
      });
    }
  }
}
