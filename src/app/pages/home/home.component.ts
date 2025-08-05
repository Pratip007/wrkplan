import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy {
  currentTab = 'dcaa-compliance';
  currentSolutionsTab = 'overview';
  expandedSections: { [key: string]: boolean } = {};

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
      image: '/assects/home/hero/erpDashboard.jpg'
    },
    finance: {
      description: 'Explore the WrkPlan solutions that help <strong style="color: #0a182e;">CFOs</strong>, <strong>Finance leaders</strong>, <strong style="color: #0a182e;">Project Managers</strong> and their teams to influence strategy, create value and enable better data-driven decision-making.',
      sections: [
        {
          id: 'finance-budgeting',
          title: 'Project budgeting and billing',
                      description: 'As part of WrkPlan ERP, projects are fully integrated with finance, accounting, procurement and payroll for clear financial visibility and planning across them – in a single view. Manage the entire project cycle from contract award to final invoice and project close-down.'
        },
        {
          id: 'finance-planning',
          title: 'Integrated financial planning',
          description: 'Comprehensive financial planning tools that integrate with project management for accurate forecasting and budget allocation across all government contracts.'
        },
        {
          id: 'finance-accounting',
          title: 'Cost accounting & reporting',
          description: 'DCAA-compliant cost accounting with automated indirect rate calculations, comprehensive reporting, and real-time cost tracking.'
        },
        {
          id: 'finance-budget',
          title: 'Budget management',
          description: 'Advanced budget management capabilities with variance analysis, approval workflows, and integration with contract funding sources.'
        },
        {
          id: 'finance-analytics',
          title: 'Financial analytics',
          description: 'Powerful financial analytics and reporting tools providing insights into project profitability, cash flow, and financial performance.'
        }
      ],
      image: '/assects/home/hero/erpDashboard.jpg'
    },
    contracts: {
      description: 'Streamline your contract lifecycle management with <strong style="color: #0a182e;">Contract leaders</strong>, <strong>Procurement teams</strong>, <strong style="color: #0a182e;">Legal departments</strong> and their teams to ensure compliance and maximize contract value.',
      sections: [
        {
          id: 'contracts-management',
          title: 'Government contract management',
          description: 'Manage multiple government contracts with different requirements, funding sources, and compliance needs. From contract award to closeout, track every aspect including CLINs, modifications, and subcontractor agreements in one integrated platform.'
        },
        {
          id: 'contracts-subcontractor',
          title: 'Subcontractor management',
          description: 'Comprehensive subcontractor management with performance tracking, compliance monitoring, and integrated payment processing.'
        },
        {
          id: 'contracts-clin',
          title: 'CLIN tracking & management',
          description: 'Advanced CLIN management capabilities with automated tracking, funding allocation, and performance monitoring across all contract line items.'
        },
        {
          id: 'contracts-modifications',
          title: 'Contract modifications',
          description: 'Streamlined contract modification processes with approval workflows, change tracking, and automated documentation.'
        },
        {
          id: 'contracts-funding',
          title: 'Funding allocation',
          description: 'Intelligent funding allocation tools with real-time visibility into contract funding, burn rates, and remaining balances.'
        }
      ],
      image: '/assects/home/hero/erpDashboard.jpg'
    },
    compliance: {
      description: 'Ensure DCAA compliance with <strong style="color: #0a182e;">Compliance officers</strong>, <strong>Audit teams</strong>, <strong style="color: #0a182e;">Finance leaders</strong> and their teams to maintain audit readiness and regulatory compliance.',
      sections: [
        {
          id: 'compliance-monitoring',
          title: 'Automated compliance monitoring',
          description: 'Built-in DCAA compliance features ensure your accounting system meets all federal requirements. Automated cost segregation, audit trails, and real-time compliance monitoring help you stay audit-ready with pre-configured chart of accounts and indirect cost pools.'
        },
        {
          id: 'compliance-audit',
          title: 'Audit trail management',
          description: 'Comprehensive audit trail management with detailed transaction history, user activity tracking, and automated documentation for audit readiness.'
        },
        {
          id: 'compliance-segregation',
          title: 'Cost segregation',
          description: 'Automated cost segregation capabilities ensuring proper allocation of direct and indirect costs in compliance with federal regulations.'
        },
        {
          id: 'compliance-rates',
          title: 'Indirect rate calculations',
          description: 'Automated indirect rate calculations with real-time updates, compliance validation, and integration with proposal pricing tools.'
        },
        {
          id: 'compliance-preparation',
          title: 'Audit preparation',
          description: 'Comprehensive audit preparation tools with automated report generation, compliance checking, and documentation management for DCAA audits.'
        }
      ],
      image: '/assects/home/hero/erpDashboard.jpg'
    },
    operations: {
      description: 'Optimize your operations with <strong style="color: #0a182e;">Operations leaders</strong>, <strong>Project managers</strong>, <strong style="color: #0a182e;">Resource managers</strong> and their teams to streamline processes and improve efficiency.',
      sections: [
        {
          id: 'operations-time',
          title: 'Time & expense management',
          description: 'Streamline time tracking and expense management with DCAA-compliant timesheets, mobile accessibility, and supervisor approval workflows. Integrate seamlessly with payroll and project accounting for complete operational visibility.'
        },
        {
          id: 'operations-resource',
          title: 'Resource planning & allocation',
          description: 'Advanced resource planning tools with capacity management, skill tracking, and automated allocation based on project requirements and availability.'
        },
        {
          id: 'operations-workforce',
          title: 'Workforce management',
          description: 'Comprehensive workforce management with employee tracking, performance monitoring, and integration with HR systems for complete operational oversight.'
        },
        {
          id: 'operations-planning',
          title: 'Project planning',
          description: 'Integrated project planning capabilities with Gantt charts, milestone tracking, and resource allocation for successful project delivery.'
        },
        {
          id: 'operations-tracking',
          title: 'Performance tracking',
          description: 'Real-time performance tracking with KPI monitoring, automated reporting, and dashboard views for operational excellence and continuous improvement.'
        }
      ],
      image: '/assects/home/hero/erpDashboard.jpg'
    }
  };

  // Hero content data
  private heroData: { [key: string]: HeroData } = {
    'dcaa-compliance': {
      headline: 'DCAA compliance keeping you up at night?',
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
      headline: 'Accelerate your ROI<br>with WrkPlan',
      subheadline: 'Transform manual billing into automated accuracy.',
      description: 'Simplify processes and control costs with our integrated platform. Streamline your financial operations with real-time insights and automated reporting capabilities.',
      primaryButton: 'Talk to Sales',
      secondaryButton: 'Learn More',
      additionalLink: 'See WrkPlan ERP demos',
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

  switchSolutionsTab(tabKey: string) {
    this.currentSolutionsTab = tabKey;
    // Clear expanded sections when switching tabs
    this.expandedSections = {};
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
