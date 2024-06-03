import { TestBed } from "@angular/core/testing";
import { ReportDashboardComponent } from "../../src/app/report-dashboard/report-dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { CreateReservationService } from "../../src/app/shared/service/create-reservation.service";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { AuthService } from "../../src/app/shared/service/auth.service";
import { NgxEchartsModule } from "ngx-echarts";
import { ReportService } from "../../src/app/shared/service/report.service";

class MockReportService {
  getRoomOccupancyData() {
    return [
      {building: 'Amsterdam', room: 'A1', numberOfUsages: 35, date: new Date(2024, 5, 21)}
    ]
  }

  getNoShowData(){
    return [
      { employee: 'Charlie White', numberOfReservations: 40, numberOfNoShows: 2}
    ]
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

      // @ts-ignore
      cy.spy(component, 'getLocationData').as('getLocationDataSpy');
      cy.spy(component, 'getRoomOccupancyData').as('getRoomOccupancyDataSpy');
      cy.spy(component, 'getNoShowData').as('getNoShowDataSpy');

      component.ngOnInit();

      cy.get('@getLocationDataSpy').should('have.been.called');
      cy.get('@getRoomOccupancyDataSpy').should('have.been.called');
      cy.get('@getNoShowDataSpy').should('have.been.called');
    });
  });

  context('ReportService tests', () => {
    const mockRoomOccupancyData = [
      { building: 'Amsterdam', room: 'A1', numberOfUsages: 35, date: new Date(2024, 5, 21) },
    ];
    const mockNoShowData = [
      { employee: 'Charlie White', numberOfReservations: 40, numberOfNoShows: 2 },
    ];

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
