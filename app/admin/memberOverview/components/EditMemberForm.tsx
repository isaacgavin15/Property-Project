"use client";

import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { updateMemberAction } from "@/utils/actions";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { member, profile, tier } from "@/utils/types";

interface EditMemberFormProps {
	member: string;
	citizenshipOptions: { value: string; label: string }[];
}

export default function EditMemberForm({
	member,
	citizenshipOptions,
}: EditMemberFormProps) {
	const memberData = JSON.parse(member);

	const [citizen, setCitizen] = useState(() => {
		if (memberData.citizen) {
			return citizenshipOptions.find(
				(option) => option.value === memberData.citizen
			);
		}
		return null;
	});

	const [birthDate, setBirthDate] = useState(() => {
		if (memberData.dob) {
			return new Date(memberData.dob);
		}
		return null;
	});

	return (
		<Card className="max-w-4xl mx-auto p-4 sm:p-6 dark:bg-black">
			<h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 dark:text-white">
				Member Profile
			</h2>
			<FormContainer
				action={async (prevState: any, formData: FormData) => {
					formData.append("citizen", citizen?.value || "");
					formData.append(
						"birthDate",
						birthDate ? birthDate.toLocaleDateString("en-CA") : ""
					);
					return updateMemberAction(prevState, formData);
				}}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
					<FormInput
						type="text"
						name="memberId"
						label="Member ID"
						defaultValue={memberData.memberId}
						readonly
					/>

					<FormInput
						type="text"
						name="membershipStatus"
						label="Membership Status"
						defaultValue={memberData.isActive === 1 ? "Active" : "Inactive"}
						readonly
					/>

					<FormInput
						type="text"
						name="fullName"
						label="Full Name"
						defaultValue={
							memberData.profile?.firstName && memberData.profile?.lastName
								? `${memberData.profile.firstName} ${memberData.profile.lastName}`
								: ""
						}
						readonly
					/>

					<div>
						<label className="block text-sm font-medium mb-2 dark:text-white">
							Citizen
						</label>
						<Select
							value={citizen}
							onChange={setCitizen}
							options={citizenshipOptions}
							className="w-full"
							classNamePrefix="select"
							placeholder="Select citizenship"
							theme={(theme) => ({
								...theme,
								colors: {
									...theme.colors,
									neutral0: "var(--background)",
									neutral80: "var(--foreground)",
								},
							})}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2 dark:text-white">
							Date of Birth
						</label>
						<DatePicker
							selected={birthDate}
							onChange={setBirthDate}
							className="w-full p-2 border rounded-md dark:bg-black dark:text-white dark:border-gray-700"
							dateFormat="yyyy-MM-dd"
							placeholderText="Select date"
						/>
					</div>

					<FormInput
						type="text"
						name="address"
						label="Address"
						defaultValue={memberData.address || ""}
					/>

					<div className="form-group">
						<label
							htmlFor="gender"
							className="block mb-2 text-sm font-medium">
							Gender
						</label>
						<select
							id="gender"
							name="gender"
							className="w-full px-4 py-2 rounded-lg border dark:bg-black dark:border-gray-700 dark:text-white"
                            defaultValue={memberData.gender || ''}
							required>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</div>

					<FormInput
						type="email"
						name="email"
						label="Email Address"
						defaultValue={memberData.profile?.email || ""}
					/>

					<FormInput
						type="text"
						name="phone"
						label="Phone Number"
						defaultValue={memberData.phone || ""}
					/>

					<FormInput
						type="text"
						name="bankName"
						label="Bank Name"
						defaultValue={memberData.bankName || ""}
					/>

					<FormInput
						type="text"
						name="bankAccNum"
						label="Bank Account Number"
						defaultValue={memberData.bankAccNum || ""}
					/>

					<FormInput
						type="text"
						name="bankAccName"
						label="Bank Account Name"
						defaultValue={memberData.bankAccName || ""}
					/>

					<FormInput
						type="text"
						name="memberLevel"
						label="Member Level"
						defaultValue={memberData.tier?.tierName || ""}
						readonly
					/>

					<FormInput
						type="text"
						name="uplineId"
						label="Upline ID"
						defaultValue={memberData.parentMemberId || "N/A"}
						readonly
					/>

					<div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-4 justify-end">
						<button
							type="button"
							className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900">
							Discard
						</button>
						<button
							type="submit"
							className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#B69C6C] text-white rounded-md hover:bg-[#A58B5B] transition-colors">
							Apply changes
						</button>
					</div>
				</div>
			</FormContainer>
		</Card>
	);
}
