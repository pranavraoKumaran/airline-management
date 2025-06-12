
export enum Type {
    email = "Email",
    sms = "SMS",
    push = "Push"

}

export enum SentStatus {
    pending = "Pending",
    sent = "Sent",
    failed = "Failed"
}

export enum Gender {
    male = "Male",
    female = "Female"
}

export enum PaymentMethod {

    creditcard = "CreditCard",
    debitcard = "DebitCard",
    paypal = "PayPal"

}

export enum PaymentStatus {
    success = "Success",
    failed = "Failed",
    pending = "Pending"

}

export enum BookingStatus {
    booked = "Booked",
    cancelled = "Cancelled",
    checkedin = "CheckedIn"
}

export enum Status {
    scheduled = "Scheduled",
    cancelled = "Cancelled",
    delayed = "Delayed"
}

export enum FrequentFlyerStatus {
    silver = "Silver",
    gold = "Gold",
    platinum = "Platinum"

}

export interface Airport {
    id?: number;
    code: string;
    name: string;
    city: string;
    country: string;

}

export interface Flight {
    id?: number;
    flightNumber: string;
    departureAirport: Airport;
    arrivalAirport: Airport;
    departureTime: Date;
    arrivalTime: Date;
    seatCapacity: number;
    availableSeats: number;
    status: Status;

}
export interface Passenger {
    id?: number;
    name: string;
    age: number;
    gender: Gender;
    passportNumber: string;
    nationality: string;
}

export interface Payment {
    id?: number;
    amount: number;
    paymentDate?: Date;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
}

export interface Booking {
    id?: number;
    customerId: number;
    bookingDate?: Date;
    flightId: number;
    seatNumber: string;
    status?: BookingStatus;
    payment: Payment;
    passenger: Passenger;
}

export interface BookingDTO {
    id?: number;
    customer: Customer;
    bookingDate?: Date;
    flight: Flight;
    seatNumber: string;
    status?: BookingStatus;
    payment: Payment;
    passenger: Passenger;

}

export interface FrequentFlyer {
    id?: number,
    membershipNumber: number,
    status: FrequentFlyerStatus,
    pointsEarned: number,
    tierExpiryDate: Date;
}

export interface Customer {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    dateOfBirth: Date,
    loyaltyPoints: number,
    frequentFlyer: FrequentFlyer

}

export interface Notification {
    id?: string;
    customerId: number;//FK
    message: string;
    type: Type;
    sentStatus: SentStatus;
    sentDate: Date;
    notificationTemplate: NotificationTemplate;//Adding for usefullness for getDetails

}

export interface NotificationTemplate {
    id?: string;
    templateName: string;
    content: string;

}