export type actionFunction = (
    prevState: any,
    formData: FormData
) => Promise<{ message: string }>;

export type PropertyCardProps = {
    image: string;
    id: string;
    name: string;
    tagline: string;
    city: string;
    price: number;
    rating: number;
    count: number;
  };

  export type DateRangeSelect = {
    startDate: Date;
    endDate: Date;
    key: string;
  };

  export type Booking = {
    checkIn: Date;
    checkOut: Date;
  };

  export type ExclusiveCardProps = {
    image: string;
    id: string;
    title: string;
    subtitle: string;
    description: string;
  };

  export type tier = {
    id: string;
    tierName: string;
    commission: number;
  };

  export type member = {
    id: string;
    profileId: string;
    parentId: string;
    memberId: string;
    createdAt: Date;
    isActive: number;
    commission: number;
    point: number;
    tierId: string;
    citizen?: string | null;
    dob?: string | null;
    phone?: string | null;
    address?: string | null;
    gender?: string | null;
    bankName?: string | null;
    bankAccNum?: string | null;
    bankAccName?: string | null;
  }

  export type profile = {
    id: string;
		firstName: string;
		lastName: string;
		email: string;
  }

  export type reward = {
    id: string;
    rewardName: string;
    pointReq: number;
  }

  export type bookingCommissionDetails = {
    id: string;
    profileId: string;
    bookingId: string;
    referalCode: string | null;
    commission: number;
    createdAt: Date;
    booking: {
      paymentStatus: boolean;
    };
  }

  export type dashboardMemberProps = {
    profile: profile;
    member: member;
    rewards: reward[];
    referralDetails: referralDetails[];
    loyaltyPointDetails: loyaltyPointDetails[];
}

export type LoyaltiPointsProps = {
  member: member;
  rewards: reward[];
  loyaltyPointDetails: loyaltyPointDetails[];
}

export type Downline = {
  memberId: string;
  id: string;
  name: string;
  downlines?: Downline[];
};

export type DownlineProps = {
  member: Downline;
  level?: number;
};

export type CitizenshipOption = {
	value: string;
	label: string;
};

export type CreateMemberFormProps = {
	profile: profile;
	citizenshipOptions: CitizenshipOption[];
}

export type ReferralCommissionProps = {
  member: member;
  referralDetails: referralDetails[];
  withdrawalRequestDetails: WithdrawalRequestDetails[];
}

export type UpdateMemberFormProps = {
	profile: profile;
	member: member;
	citizenshipOptions: CitizenshipOption[];
}

export type RegistrationDetails = {
  subTotal: number;
  tax: number;
  orderTotal: number;
};

export type membershipCommissionTransaction = {
  id: string;
  profileId: string;
  closerId: string;
  commission: number;
  closerCommission: number;
  referalCode: string | null;
  paymentStatus: boolean;
}

export type referralDetails = {
  id: string;
  profile: {
    firstName: string;
    lastName: string;
  };
  commission: number;
  createdAt: Date;
  paymentStatus: boolean;
  type: 'Membership' | 'Booking';
}

export type loyaltyPointDetails = {
  id: string;
  createdAt: Date;
  profile: {
    firstName: string;
    lastName: string;
  };
  type: 'Membership Referral' | `Redeem Reward: ${string}`;
  point: number;
}

export type ConfirmWithdrawModalProps = {
  member: member;
  setShowWithdrawModal: (show: boolean) => void;
  setShowSuccessModal: (show: boolean) => void;
}

export type WithdrawalRequestDetails = {
  id: string;
  profile: profile;
  amount: number;
  bankName: string;
  bankAccNumber: string;
  bankAccName: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: Date;
}

export type WithdrawalHistoryModalProps = {
  member: member;
  withdrawalRequestDetails: WithdrawalRequestDetails[];
  setShowWithdrawalHistoryModal: (show: boolean) => void;
}
