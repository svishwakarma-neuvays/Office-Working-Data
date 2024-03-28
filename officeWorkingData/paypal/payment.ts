import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';
declare var paypal: any;
@Component({
  selector: 'app-donate1',
  templateUrl: './donate1.page.html',
  styleUrls: ['./donate1.page.scss'],
})
export class Donate1Page implements OnInit {
  selectedFiles: any;
  currentFile: any;
  progress = 0;
  message = '';
  preview = '';
  addScript: boolean = false;
  finalAmount: number = 1;
  paypalLoad: boolean = true;
  name: string = "";
  email: string = "";
  amount: any = "";
  razorpayKey: string = "";
  loaction: any;
  contact: any
  lname: any;
  currency: any;
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    location: '',
    amount: 0,
    currency: ''
  };
  paypalLoaded = false;
  count: any = 0;
  constructor(private toast: ToastService, private commonService: CommonService) {
  }
  ngOnInit() {
    // this.processPayment();
  }
  logs: string[] = [];
  pushLog(msg: any) {
  }
  handleChange(e: any) {
  }
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file = this.selectedFiles.item(0);
      if (file) {
        this.preview = '';
        this.currentFile = file;
        console.log('file', this.currentFile)
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
          localStorage.setItem("key", this.preview)
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  processPayment() {
    const paypalConfig = {
      currency: 'USD',
      // clientId: 'AVxpSyS2yHvnsPyQMwFQz-6BcGIvC3c0r3RMYnu-lmZSYys5dEuV3lfGMVZoLLMhagj2xQgvJhn7KZYU',  ///sandbox
      clientId: 'AQlo-fnTj4u6ki-itqiWJCM2zWOTohfN9CRoYQci_pue9hv_5TT153Zoa3eHyHa6Bsya1ASlwLjcdlSL', ///live
    };
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: paypalConfig.currency,
                value: this.formData.amount,
              },
            },
          ],
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          // Handle payment success
          console.log(details);
          let form = new FormData();
          form.append('payerId', details.id)
          form.append('paymentId', details.purchase_units[0].payments.captures[0].id)
          form.append('email', this.formData.email)
          form.append('firstName', this.formData.firstName)
          form.append('lastName', this.formData.lastName)
          form.append('contact', this.formData.contact)
          form.append('location', this.formData.location)
          form.append('amount', this.formData.amount + ' ' + '$')
          form.append('file', this.currentFile ? this.currentFile : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg')
          this.commonService.donation(form).then((resp: any) => {
            if (resp.updatedAt || resp.createdAt) {
              this.toast.showToast('success', 'Donation Complete');
              this.formData = {
                firstName: '',
                lastName: '',
                email: '',
                contact: '',
                location: '',
                amount: 0,
                currency: ''
              };
            } else {
              this.toast.showToast('error', 'Something went wrong');
            }
          }, error => {
            // this.toast.showToast('error', 'Something went wrong')
          })
        });
      },
      onCancel: (data: any) => {
        // Handle payment cancellation
        console.log('Payment canceled', data);
        this.toast.showToast('error', data)
      },
      onError: (err: any) => {
        // Handle payment error
        console.log(err);
        this.toast.showToast('error', 'Something went wrong')
      },
    }).render('#paypal-button-container');
  }
  donate() {
    if (this.formData.firstName && this.formData.email && this.formData.contact && this.formData.amount) {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g;
      if (emailRegex.test(this.formData.email)) {
        console.log("Valid email address!");
        this.count++;
        if(this.count == 1){
          this.processPayment()
        }
      } else {
        this.toast.showToast('error', "Invalid Email Address!");
      }
    } else {
      this.toast.showToast('error', 'Please fill all mandatory fields.')
    }
  }
}
https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg

<script src="https://www.paypal.com/sdk/js?client-id=AQlo-fnTj4u6ki-itqiWJCM2zWOTohfN9CRoYQci_pue9hv_5TT153Zoa3eHyHa6Bsya1ASlwLjcdlSL"></script>