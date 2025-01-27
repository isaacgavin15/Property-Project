'use client'

import { fetchMemberRequests } from "@/utils/actions";
import ViewNewMemberModal from "./modals/ViewNewMemberModal";
import { useEffect, useState } from "react";

type MemberRequest = {
  id: string,
  memberId: string,
  member: {
    profile: {
      firstName: string,
      lastName: string,
      email: string,
    },
    tier: {
      tierName: string,
    },
    dob: string | null,
    citizen: string | null,
    phone: string | null,
    address: string | null,
    gender: string | null,
    bankName: string | null,
    bankAccNum: string | null,
    bankAccName: string | null,
    isActive: number,
  },
  referalCode: string | null,
  closerId: string | null,
  paymentMethod: string,
  proofOfPayment: string | null,
  paymentStatus: boolean,
  createdAt: Date,
}

export function MemberRequests() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<MemberRequest | null>(null)
  const [memberRequests, setMemberRequests] = useState<MemberRequest[]>([]);

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRequest(null)
  }

  const handleViewClick = (memberId: string) => {
    setSelectedRequest(memberRequests.find(request => request.memberId === memberId) || null)
    setIsModalOpen(true)
  }

  useEffect(() => {
		const getMemberRequests = async () => {
			const data = await fetchMemberRequests();
			setMemberRequests(data as MemberRequest[]);
		};
		getMemberRequests();
	}, []);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Referral ID</th>
              <th className="px-6 py-3">Closer ID</th>
              <th className="px-6 py-3">Payment Method</th>
              <th className="px-6 py-3">Payment Status</th>
              <th className="px-6 py-3">Registration Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {memberRequests.map((request) => (
              <tr key={request.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div>
                    <div className="font-medium">
                      {request.member?.profile.firstName} {request.member?.profile.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {request.memberId}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{request.referalCode}</td>
                <td className="px-6 py-4">{request.closerId}</td>
                <td className="px-6 py-4">{request.paymentMethod}</td>
                <td className="px-6 py-4">
                  {request.paymentStatus ? 'Completed' : 'Pending'}
                </td>
                <td className="px-6 py-4">{request.createdAt.toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleViewClick(request.memberId)} className="text-green-600 border border-green-600 rounded-md px-2 py-1 hover:text-green-900 mr-3">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {memberRequests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No pending member requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ViewNewMemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        memberData={selectedRequest}
      />
    </div>
  );
}