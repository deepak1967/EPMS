import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables);
  }

  projects: any = {}
  users: any = {}
  tasks: any = {}


  // KPI data
  kpiData: any = {
    projects: {
      total: 24,
      ongoing: 12,
      completed: 8,
      onHold: 4,
    },
    users: {
      total: 200,
      active: 150,
      inactive: 50,
    },
    tasks: {
      total: 32,
      overdue_1_3: 4,
      overdue_4_7: 3,
      overdue_7_plus: 1,
    },
  };

  ngOnInit(): void {
    this.getKpiData();
  }

  getKpiData() {
    this.dashboardService.getKpiData().subscribe((res: any) => {
      this.projects = res?.kpiData?.projects;
      this.users = res?.kpiData?.users;
      this.tasks = res?.kpiData?.tasks;

      this.ProjectChart();
      this.UserChart();
      this.OverdueChart();
    })
  }

  ProjectChart() {

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Ongoing', 'Completed', 'On Hold'],
        datasets: [
          {
            label: 'Projects',
            data: [
              this.projects.ongoing,
              this.projects.completed,
              this.projects.onHold,
            ],
            backgroundColor: ['#66BB6A', '#FFA726', '#EF5350'],
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const chartId: ChartItem = document.getElementById('ProjectChart') as ChartItem;
    if (chartId) {
      new Chart(chartId, config);
    }
  }

  UserChart() {
    const config: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [
          {
            label: 'User Statistics',
            data: [
              this.users.active,
              this.users.inactive,
            ],
            backgroundColor: ['#42A5F5', '#66BB6A'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    };

    const chartId: ChartItem = document.getElementById('UserChart') as ChartItem;
    if (chartId) {
      new Chart(chartId, config);
    }
  }

  OverdueChart() {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Overdue Tasks'],
        datasets: [
          {
            label: '1–3 Days',
            data: [this.tasks.overdue_1_3],
            backgroundColor: '#FFB74D',
          },
          {
            label: '4–7 Days',
            data: [this.tasks.overdue_4_7],
            backgroundColor: '#EF5350',
          },
          {
            label: '7+ Days',
            data: [this.tasks.overdue_7_plus],
            backgroundColor: '#AB47BC',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
      },
    };

    const chartId: ChartItem = document.getElementById('OverdueChart') as ChartItem;
    if (chartId) {
      new Chart(chartId, config);
    }
  }
}
