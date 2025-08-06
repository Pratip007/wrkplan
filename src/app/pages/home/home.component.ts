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
      currentSolutionsTab = 'budgeting';
  expandedSections: { [key: string]: boolean } = {};
  isVideoPlaying = false;

  // Video section properties
  currentVideoCategory = 'federal';
  videoCategoryData: { [key: string]: any } = {
    federal: {
      title: "Accelerating compliance & driving growth",
      description: "Discover how <strong>SYSTOLIC Inc</strong>, a fast-growing government contractor, adopted WrkPlan's intuitive Cloud platform to empower finance teams, drive business growth and increase DCAA compliance.",
      videoTime: "3:24",
      backgroundImage: "url('/assects/home/testimonials/image.png')"
    },
    defense: {
      title: "Securing defense contracts with confidence",
      description: "Learn how <strong>Garcia Information Systems</strong>, a leading defense contractor, streamlined their operations with WrkPlan's integrated platform to manage complex security clearance requirements and multi-year contracts.",
      videoTime: "4:12",
      backgroundImage: "url('/assects/home/testimonials/image.png')"
    },
    consulting: {
      title: "Transforming consulting operations",
      description: "See how <strong>Federal Consulting Group</strong> leveraged WrkPlan's project accounting capabilities to improve billing accuracy, reduce administrative overhead, and accelerate cash flow.",
      videoTime: "2:58",
      backgroundImage: "url('/assects/home/testimonials/image.png')"
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
    budgeting: {
      description: 'WrkPlan streamlines running your day-to-day operations so you can focus on customer satisfaction and growing your enterprise. Our Project Management gives you the tools you need to monitor the entire company or current performance on existing contracts, while the Budgeting and Forecasting module allows you to set targets and plan for the future.',
      cta: 'Explore Budgeting Features',
      sections: [
        {
          id: 'budgeting-planning',
          title: 'Estimating, Tracking and Planning for the Future',
          description: 'Comprehensive tools for project estimation and future planning with advanced tracking capabilities.'
        },
        {
          id: 'budgeting-analysis',
          title: 'Project Budget vs. Actuals and Forecast Trends',
          description: 'Compare planned budgets against actual performance and analyze forecast trends for better decision making.'
        },
        {
          id: 'budgeting-control',
          title: 'Monitor and Control Costs',
          description: 'Real-time cost monitoring and control mechanisms to keep projects within budget parameters.'
        },
        {
          id: 'budgeting-reporting',
          title: 'Project Income Statement and Easy Exporting',
          description: 'Generate comprehensive project income statements with easy exporting and importing options for seamless data management.'
        },
        {
          id: 'budgeting-versions',
          title: 'Multiple Budget Versions and Monthly Budgets by Task',
          description: 'Create and manage multiple budget versions with detailed monthly budgets broken down by individual tasks.'
        },
        {
          id: 'budgeting-forecasting',
          title: 'Contract Cost to Complete and Variance Analysis',
          description: 'Track contract cost to complete, analyze variance by project, and generate project revenue or EBIT forecasts.'
        }
      ],
      video: '/assects/home/Solutions Overview/erp overview.mp4',
      image: '/assects/home/hero/erpDashboard.jpg'
    },
    subcontractor: {
      description: 'Simplify Subcontractor Oversight. Track hours, approvals, payments, and assignments for subcontractors and 1099s.',
      cta: 'Explore Subcontractor Features',
      sections: [
        {
          id: 'subcontractor-portal',
          title: 'Subcontractor Time Entry Portal',
          description: 'Subcontractors can log time directly into the system—no need to wait for external billing.'
        },
        {
          id: 'subcontractor-approval',
          title: 'Approval Workflow',
          description: 'Supervisors can review, return, or approve subcontractor entries with ease.'
        },
        {
          id: 'subcontractor-voucher',
          title: 'Voucher Integration',
          description: 'Approved time flows directly into accounts payable for payment processing.'
        },
        {
          id: 'subcontractor-cost',
          title: 'Cost Visibility',
          description: 'Subcontractor costs are rolled into task- and contract-level reporting in real time.'
        },
        {
          id: 'subcontractor-benefits',
          title: 'Key Benefits',
          description: 'Accelerate subcontractor billing and payment • Maintain compliance with clean timekeeping and approvals • Increase visibility into total labor costs—employee and subcontractor'
        }
      ],
      image: '/assects/home/Solutions Overview/workforse management.png'
    },
    purchasing: {
      description: 'Procurement That Powers Your Projects. Efficiently manage direct materials, inventory items, and indirect purchases with real-time cost tracking.',
      cta: 'Explore the Purchasing Module',
      sections: [
        {
          id: 'purchasing-tracking',
          title: 'Real-Time Inventory Tracking',
          description: 'FIFO, LIFO, or average cost methods'
        },
        {
          id: 'purchasing-warehouse',
          title: 'Multi-Warehouse Support',
          description: 'Track inventory across multiple locations'
        },
        {
          id: 'purchasing-reorder',
          title: 'Automated Reorder Points',
          description: 'Set minimum quantities and standard reorder amounts'
        },
        {
          id: 'purchasing-charging',
          title: 'Direct Material Charging',
          description: 'Automatically charge materials to specific projects'
        },
        {
          id: 'purchasing-vendor',
          title: 'Vendor Management',
          description: 'Maintain supplier information and purchase history'
        },
        {
          id: 'purchasing-po',
          title: 'Purchase Order Generation',
          description: 'Create and track POs with approval workflows'
        },
        {
          id: 'purchasing-receiving',
          title: 'Receiving & Inspection',
          description: 'Match receipts to purchase orders'
        }
      ],
      image: '/assects/home/Solutions Overview/contract management.webp'
    },
    insights: {
      description: 'Procurement and Inventory—Simplified. WrkPlan streamlines the full purchasing lifecycle from requisition to PO and inventory tracking. Save time and eliminate bottlenecks.',
      cta: 'Explore Business Insights',
      sections: [
        {
          id: 'insights-inventory',
          title: 'Inventory Valuation',
          description: 'Real-time inventory values and turnover analysis'
        },
        {
          id: 'insights-purchase',
          title: 'Purchase Analysis',
          description: 'Spending by vendor, category, and project'
        },
        {
          id: 'insights-aging',
          title: 'Inventory Aging',
          description: 'Identify slow-moving or obsolete inventory'
        },
        {
          id: 'insights-variance',
          title: 'Cost Variance Reports',
          description: 'Compare actual vs. budgeted material costs'
        },
        {
          id: 'insights-vendor',
          title: 'Vendor Performance',
          description: 'Delivery times, quality metrics, and pricing trends'
        }
      ],
      image: '/assects/home/Solutions Overview/finance management.png'
    },
    incurred: {
      description: 'Incurred Cost Submission in Minutes. Automatically generate 16 ICE schedules (A–O) using your existing data. No spreadsheets, no scrambling, no stress.',
      cta: 'See ICE Automation in Action',
      sections: [
        {
          id: 'incurred-schedules',
          title: 'Includes all DCAA-required Schedules A- O',
          description: 'WrkPlan includes all DCAA-required Schedules A–O, ensuring full compliance with government audit standards. From indirect rate calculations to cost submissions, everything is structured for accurate reporting and easy review by DCAA.'
        },
        {
          id: 'incurred-ledger',
          title: 'No double entry- built on your ledger data',
          description: 'Say goodbye to redundant data entry. WrkPlan integrates directly with your general ledger, ensuring that every financial detail—from billing to compliance reporting—is accurate, consistent, and aligned with DCAA requirements.'
        },
        {
          id: 'incurred-audit',
          title: 'Audit-Ready Outputs, Rate + Pool Consistency',
          description: 'Ensure audit-ready outputs with consistent application of indirect rates and cost pools. The system maintains alignment across financial statements, schedules, and submissions to meet DCAA audit expectations.'
        },
        {
          id: 'incurred-forms',
          title: 'Forms built for easy DCAA submission',
          description: 'Pre-formatted forms are structured to meet DCAA standards, making it easy to generate, review, and submit required schedules with confidence and accuracy.'
        },
        {
          id: 'incurred-sync',
          title: 'Sync rate data with ledger and submissions',
          description: 'Rate calculations are seamlessly integrated with ledger entries and submission outputs for accurate, audit-ready financials.'
        }
      ],
      image: '/assects/home/Solutions Overview/image.png'
    }
  };

  // Hero content data
  private heroData: { [key: string]: HeroData } = {
    'dcaa-compliance': {
      headline: 'One Platform for  Contract Management and Project Accounting',
      subheadline: 'WrkPlan has everything you need to run your contract-based business. Manage your contracts, finances, and workforce in a single platform that\'s easy-to-use and delivers immediate value',
      description: 'WrkPlan has everything you need to run your contract-based business. Manage your contracts, finances, and workforce in a single platform that\'s easy-to-use and delivers immediate value.',
      primaryButton: 'Talk to Sales',
      secondaryButton: 'Download ebook',
      additionalLink: 'Read our blog: How SYSTOLIC Inc. achieved 94% faster invoicing',
      image: '/assects/home/hero/dc.jpg',
      bulletPoints: [
        'Pre-configured chart of accounts and indirect cost pools',
        'Automated cost segregation and audit trails',
        'Real-time compliance monitoring and alerts'
      ]
    },
    'contract-management': {
      headline: ' The Complete ERP Platform for Government Contractors',
      subheadline: 'Streamline contract management, ensure DCAA compliance, and accelerate cash flow with WrkPlan\'s all-in-one cloud-based ERP solution designed specifically for government contractors',
      description: 'Streamline contract management, ensure DCAA compliance, and accelerate cash flow with WrkPlan\'s all-in-one cloud-based ERP solution designed specifically for government contractors.',
      primaryButton: 'Sign up- Its free',
      secondaryButton: 'Learn more',
      additionalLink: 'See how Garcia Information Systems transformed their operations',
      image: '/assects/home/hero/a.png',
      bulletPoints: [
        'Integrate multiple contract types (CPFF, T&M, Fixed Price)',
        'Collaborate across teams with real-time funding visibility',
        'Streamline CLIN management and modification tracking'
      ]
    },
    'workforce-management': {
      headline: 'Streamline Payroll with Time, Labor & HR Integration',
      subheadline: 'Manage timesheets and expenses, as well as sub-contractors, in compliance with DCAA.',
      description: 'DCAA-compliant time tracking and employee management with integrated payroll and performance tracking.',
      primaryButton: 'Schedule a Compliance Demo',
      secondaryButton: 'Get a Free Demo',
      additionalLink: 'Read our blog: How SYSTOLIC Inc. achieved 94% faster invoicing',
      image: '/assects/home/hero/Untitled design (5).png',
      bulletPoints: [
        'Time and Expense',
        'Payroll Integration',
        'Employee Management',
        'Subcontractor Management'
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

    // Ensure video plays when Overview or Budgeting tab is selected
    if (tabKey === 'overview' || tabKey === 'budgeting') {
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
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      this.forceVideoPlay(video);
    }
  }

  playStoryVideo() {
    this.isVideoPlaying = true;
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
    if (video && (this.currentSolutionsTab === 'overview' || this.currentSolutionsTab === 'budgeting')) {
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
        if (video && (this.currentSolutionsTab === 'overview' || this.currentSolutionsTab === 'budgeting')) {
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
        if (video && (this.currentSolutionsTab === 'overview' || this.currentSolutionsTab === 'budgeting')) {
          this.forceVideoPlay(video);
        }
      }, delay);
    });

    // Set up interval to ensure video keeps playing
    setInterval(() => {
      const video = document.querySelector('video') as HTMLVideoElement;
      if (video && video.paused && (this.currentSolutionsTab === 'overview' || this.currentSolutionsTab === 'budgeting')) {
        this.forceVideoPlay(video);
      }
    }, 2000);
  }

  // Carousel functionality for insights section
  currentInsightsPage = 0;
  totalInsightsPages = 2;

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

