import { TestBed } from "@angular/core/testing";
import { ReportDashboardComponent } from "../../src/app/report-dashboard/report-dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { CreateReservationService } from "../../src/app/shared/service/create-reservation.service";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { AuthService } from "../../src/app/shared/service/auth.service";
import { NgxEchartsModule } from "ngx-echarts";
import { ReportService } from "../../src/app/shared/service/report.service";
import { Observable, of } from "rxjs";
import { Building } from "../../src/app/shared/model/building.model";
import { ApiResponse } from "../../src/app/shared/service/api.service";
import { RoomOccupancy } from "../../src/app/shared/model/room-occupancy.model";
import { NoShow } from "../../src/app/shared/model/no-show.model";

export class MockReportService {
  public getRoomOccupancyData(buildingName: string, year: number): Observable<ApiResponse<RoomOccupancy[]>> {
    return of({payload: [new RoomOccupancy('A1', 35, new Date(2023, 11, 31))], message: '', statusCode: ''});
  }

  public getNoShowData(buildingName: string, year: number): Observable<ApiResponse<NoShow[]>> {
    return of({payload: [new NoShow('Test employee', 40, 2)], message: '', statusCode: ''});
  }

  public getBuildings(): Observable<ApiResponse<Building[]>> {
    return of({payload: [new Building('testId', 'De Entree 21 1101 BH', 'Amsterdam')], message: '', statusCode: ''});
  }
}

describe('ReportDashboardComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
      providers: [CreateReservationService, ToastrService, AuthService]
    });
  });

  it('should mount', () => {
    cy.mount(ReportDashboardComponent);
  });

  it('should call methods inside ngOnInit', () => {
    cy.mount(ReportDashboardComponent).then((componentRef) => {
      const component = componentRef.component;

      cy.spy(component, 'getBuildings').as('getBuildingsSpy');

      component.ngOnInit();

      cy.get('@getBuildingsSpy').should('have.been.called');
    }); 
  });

  context('ReportService tests', () => {
    const mockRoomOccupancyData = [new RoomOccupancy('A1', 35, new Date(2023, 11, 31))];
    const mockNoShowData = [new NoShow('Test employee', 40, 2)];

    let mockReportService: MockReportService;

    const mountComponent = (mockService: MockReportService) => {
      return cy.mount(ReportDashboardComponent, {
        providers: [{ provide: ReportService, useValue: mockService }],
      }).then((componentRef) => componentRef.component);
    };

    beforeEach(() => {
      mockReportService = new MockReportService();
    })

    it('should return room occupancy data', () => {
      cy.spy(mockReportService, 'getRoomOccupancyData').as('roomOccupancySpy');

      mountComponent(mockReportService).then((component) => {
        component.ngOnInit();

        cy.get('@roomOccupancySpy').should('have.been.called')
        expect(component.roomOccupancyData).to.deep.equal(mockRoomOccupancyData);
      });
    });

    it('should return no show data', () => {
      cy.spy(mockReportService, 'getNoShowData').as('noShowSpy');
  
      mountComponent(mockReportService).then((component) => {
        component.ngOnInit();

        cy.get('@noShowSpy').should('have.been.called')
        expect(component.noShowData).to.deep.equal(mockNoShowData);
      });
    })
  })
})