import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { locationsModel } from '../shared/models/locations.model';
import { CreateReservationService } from '../shared/service/create-reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoShowModel, ReportService, RoomOccupancyModel } from '../shared/service/report.service';

@Component({
  selector: 'app-report-dashboard',
  standalone: true,
  imports: [
    NgxEchartsModule, 
    CommonModule, 
    FormsModule,
  ],
  templateUrl: './report-dashboard.component.html',
  styleUrl: './report-dashboard.component.scss'
})
export class ReportDashboardComponent implements OnInit {
  public selectedYear: number = new Date().getFullYear();
  public selectedLocation!: string;

  public locations: locationsModel[] = [];
  public years: number[] = [
    this.selectedYear,
    (this.selectedYear - 1),
    (this.selectedYear - 2),
  ];
  
  public roomOccupancyData: RoomOccupancyModel[] = [];

  // TODO: Remove this when connecting to backend
  public filteredRoomData: RoomOccupancyModel[] = [];
  public noShowData: NoShowModel[] = [];

  public mostUsagesPieOptions!: EChartsOption;
  public leasUsagesPieOptions!: EChartsOption;
  public heatmapOptions!: EChartsOption;
  private maxDataValue: number = 0;
    
  constructor(private reservationService: CreateReservationService, private reportService: ReportService) {}

  ngOnInit(): void {
    this.locations = this.reservationService.getLocations();
    this.selectedLocation = this.locations[0].location;
    this.getRoomOccupancyData();
    this.noShowData = this.reportService.getNoShowData();
  }

  private setChartOptions(): void {
    this.setMostUsagesPieChartOptions();
    this.setLeastUsagesPieChartOptions();
    this.setHeatmapOptions();
  }
  
  private getRoomOccupancyData(): void {
    this.roomOccupancyData = this.reportService.getRoomOccupancyData(this.selectedLocation, this.selectedYear);

    // TODO: remove this when connecting to backend
    this.filteredRoomData = this.roomOccupancyData.filter(data => {
      return data.date.getFullYear() === this.selectedYear && data.building === this.selectedLocation
    })
    this.setChartOptions();
  }

  public onChangeFilter(): void {
    this.getRoomOccupancyData();
  }

  private setHeatmapOptions(): void {
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
    const rooms: string[] = this.filteredRoomData.map(item => item.room)
    const heatmapData = this.createHeatmapData(rooms, months);

    this.heatmapOptions = {
      title: {
        text: 'Heatmap van ruimtebezetting',
        left: 'center',
      },
      tooltip: {
        position: 'top',
      },
      grid: {
        height: '50%',
        top: '15%',
      },
      xAxis: {
        type: 'category',
        data: rooms,
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: months,
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: 0,
        max: this.maxDataValue,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '10%'
      },
      series: [{
        name: 'Bezetting',
        type: 'heatmap',
        data: heatmapData,
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
  }

  private createHeatmapData(rooms: string[], months: string[]): number[][] {
    const matrix: number[][] = Array.from({ length: rooms.length }, () => Array(months.length).fill(0));
    const data: number[][] = [];
    this.maxDataValue = 0;

    this.filteredRoomData.forEach((item) => {
      const room = rooms.indexOf(item.room);
      const month = item.date.getMonth();
      matrix[room][month] += item.numberOfUsages;
    });

    for (let i = 0; i < rooms.length; i++) {
      for (let j = 0; j < months.length; j++) {
        data.push([i, j, matrix[i][j]]);
        if (matrix[i][j] > this.maxDataValue) {
          this.maxDataValue = matrix[i][j];
        }
      }
    }

    return data;
  }

  private setMostUsagesPieChartOptions(): void {
    const chartData = this.filteredRoomData.sort((a, b) => b.numberOfUsages - a.numberOfUsages);
    const top5 = chartData.slice(0, 5);
    this.mostUsagesPieOptions = this.setPieChartOptions('Meest gebruikte ruimtes', top5);
  }

  private setLeastUsagesPieChartOptions(): void {
    const chartData = this.filteredRoomData.sort((a, b) => a.numberOfUsages - b.numberOfUsages);
    const bottom5 = chartData.slice(0, 5);
    this.leasUsagesPieOptions = this.setPieChartOptions('Minst gebruikte ruimtes', bottom5);
  }

  private setPieChartOptions(title: string, chartData: RoomOccupancyModel[]): EChartsOption {
    const data = chartData.map(item => ({
      name: item.room,
      value: item.numberOfUsages
    }));

    return {
      title: {
        text: title,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        top: '10%',
      },
      series: [
        {
          name: 'bezetting',
          type: 'pie',
          radius: '50%',
          top: '10%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}
