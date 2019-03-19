import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Pagination, PaginatedResults } from '../_models/pagination';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(private authService: AuthService, private userService: UserService,
    private route: ActivatedRoute, private alertify: AlertifyService) { }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';
  }

  loadUsers() {
    // tslint:disable-next-line:no-debugger
    this.userService
      .getUsers(this.pagination.currentPage, 10, null, this.likesParam)
      .subscribe(
        (res: PaginatedResults<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
  }
}
