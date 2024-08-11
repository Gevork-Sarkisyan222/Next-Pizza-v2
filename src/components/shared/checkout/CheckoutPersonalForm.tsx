import React from 'react';
import WhiteBlock from '../WhiteBlock';
import FormInput from '../form/FormInput';

type Props = {
  className: string;
};

const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock className={className} title="2. Персональная информация">
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" label="Имя" required={true} />
        <FormInput name="lastName" label="Фамилия" required={true} />
        <FormInput name="email" label="E-Mail" required={true} />
        <FormInput name="phone" label="Телефон" required={true} />
      </div>
    </WhiteBlock>
  );
};

export default CheckoutPersonalForm;
