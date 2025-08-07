import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  isOpen = false;
  messages: ChatMessage[] = [];
  currentMessage = '';
  isTyping = false;
  messageId = 0;

  // Bot responses for different keywords
  private botResponses = {
    'hello': 'Hello! 👋 I\'m here to help you with WRKPLAN\'s DCAA compliance solutions. How can I assist you today?',
    'hi': 'Hi there! 👋 Welcome to WRKPLAN. I can help you with contract management, DCAA compliance, and more. What would you like to know?',
    'dcaa': 'DCAA compliance is crucial for government contractors. WRKPLAN provides built-in compliance features including audit trails, time tracking, and automated reporting. Would you like to learn more about our compliance solutions?',
    'compliance': 'Our compliance features include real-time audit trails, automated reporting, time tracking, and built-in DCAA requirements. This helps ensure your contracts meet government standards. Would you like a demo?',
    'contract': 'WRKPLAN offers comprehensive contract management with features like automated workflows, document tracking, and compliance monitoring. How can I help you with contract management?',
    'demo': 'Great! I can help you schedule a demo. Our team will show you how WRKPLAN streamlines your government contracting operations. Would you like to book a demo now?',
    'pricing': 'Our pricing is tailored to government contractors. We offer flexible plans based on your contract volume and compliance needs. Would you like to discuss pricing options?',
    'contact': 'You can reach us at (856) 266-2846 or sales@wrkplan.com. Our team is ready to help you with DCAA compliance and contract management solutions.',
    'help': 'I can help you with information about DCAA compliance, contract management, demos, pricing, and contacting our team. What would you like to know?',
    'features': 'WRKPLAN features include: DCAA compliance tools, contract management, time tracking, audit trails, automated reporting, and government contractor support. Which feature interests you most?'
  };

  ngOnInit() {
    // Add welcome message when component initializes
    this.addBotMessage('Hello! 👋 I\'m your WRKPLAN assistant. I can help you with DCAA compliance, contract management, and more. How can I assist you today?');
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => {
        this.messageInput?.nativeElement?.focus();
      }, 100);
    }
  }

  sendMessage() {
    if (this.currentMessage.trim()) {
      this.addUserMessage(this.currentMessage);
      this.currentMessage = '';
      this.simulateBotResponse();
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  addUserMessage(text: string) {
    this.messages.push({
      id: ++this.messageId,
      text,
      isUser: true,
      timestamp: new Date()
    });
    this.scrollToBottom();
    this.simulateBotResponse();
  }

  private addBotMessage(text: string) {
    this.messages.push({
      id: ++this.messageId,
      text,
      isUser: false,
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  private simulateBotResponse() {
    this.isTyping = true;
    this.scrollToBottom();

    setTimeout(() => {
      this.isTyping = false;
      const userMessage = this.messages[this.messages.length - 1].text.toLowerCase();
      let response = this.getBotResponse(userMessage);

      if (!response) {
        response = 'I\'m here to help with WRKPLAN\'s DCAA compliance and contract management solutions. You can ask me about features, pricing, demos, or contact information. How can I assist you?';
      }

      this.addBotMessage(response);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  }

  private getBotResponse(userMessage: string): string {
    // Check for exact matches first
    for (const [keyword, response] of Object.entries(this.botResponses)) {
      if (userMessage.includes(keyword)) {
        return response;
      }
    }

    // Check for partial matches
    if (userMessage.includes('government') || userMessage.includes('contractor')) {
      return 'WRKPLAN is specifically designed for government contractors. We help ensure DCAA compliance and streamline contract management. Would you like to learn more about our solutions?';
    }

    if (userMessage.includes('time') || userMessage.includes('tracking')) {
      return 'Our time tracking features are DCAA compliant and include automated reporting, audit trails, and real-time monitoring. This helps ensure your time records meet government standards.';
    }

    if (userMessage.includes('audit') || userMessage.includes('report')) {
      return 'WRKPLAN provides comprehensive audit trails and automated reporting that meet DCAA requirements. This helps you maintain compliance and prepare for government audits.';
    }

    return '';
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
