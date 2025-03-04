'use client';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useProperty } from '@/utils/store';
import FormContainer from '@/components/form/FormContainer';
import { SubmitButton } from '@/components/form/Buttons';
import { createBookingAction } from '@/utils/actions';
import { useState } from 'react';

function ConfirmBooking() {
    const { userId } = useAuth();
    const { propertyId, range, referalCode} = useProperty((state) => state);
    const checkIn = range?.from as Date;
    const checkOut = range?.to as Date;
    if (!userId)
        return (
            <SignInButton mode='modal'>
                <Button type='button' className='w-full'>
                    Ready to book? Log in to continue.
                </Button>
            </SignInButton>
        );

    const createBooking = createBookingAction.bind(null, {
        propertyId,
        checkIn,
        checkOut,
        referalCode
    });
    return (
        <section>
            <FormContainer action={createBooking}>
                <SubmitButton text='Reserve now!' className='w-full' />
            </FormContainer>
        </section>
    );
}
export default ConfirmBooking;