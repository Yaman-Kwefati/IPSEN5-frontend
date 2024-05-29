import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoShowModel, ReportService, RoomOccupancyModel } from '../shared/service/report.service';
import { Building } from '../shared/model/building.model';

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
  public selectedBuilding!: string;

  // TODO: remove testdata when connecting with backend
  public buildings: Building[] = [
    new Building("testId1", "De Entree 21 1101 BH", "Amsterdam"),
    new Building("testId2", "Utrechtseweg 310 / gebouw B42 6812 AR", "Arhem"),
    new Building("testId3", "DHigh Tech Campus 5 5656 AE", "Eindhoven"),
    new Building("testId4", "Eemsgolaan 1 9727 DW", "Groningen"),
    new Building("testId5", "Stationsplein 12 6221 BT", "Maastricht"),
    new Building("testId5", "George Hintzenweg 89 3068 AX", "Rotterdam"),
  ];

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
    
  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getBuildings();
    this.getRoomOccupancyData();
    this.getNoShowData();
  }

  private setChartOptions(): void {
    this.setMostUsagesPieChartOptions();
    this.setLeastUsagesPieChartOptions();
    this.setHeatmapOptions();
  }
  
  public getRoomOccupancyData(): void {
    this.roomOccupancyData = this.reportService.getRoomOccupancyData(this.selectedBuilding, this.selectedYear);

    // TODO: remove this when connecting to backend
    this.filteredRoomData = this.roomOccupancyData.filter(data => {
      return data.date.getFullYear() === this.selectedYear && data.building === this.selectedBuilding
    })
    this.setChartOptions();
  }

  public getNoShowData(): void {
    this.noShowData = this.reportService.getNoShowData(this.selectedBuilding, this.selectedYear);
  }

  public getBuildings(): void {
    this.selectedBuilding = this.buildings[0].name;
  }

  public onChangeFilter(): void {
    this.getRoomOccupancyData();
    this.getNoShowData();
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
