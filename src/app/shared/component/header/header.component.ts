import { ChangeDetectorRef, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isHandset: boolean = false;
  headerTitle: string = '';
  private destroy$ = new Subject<void>();


  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isHandset = result.matches;
    });
  }


  ngOnInit(): void {
    this.sharedService.headerTitle$
      .pipe(takeUntil(this.destroy$))
      .subscribe((title) => {
        this.headerTitle = title;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
