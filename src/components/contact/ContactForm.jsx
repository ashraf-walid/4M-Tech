'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { FormInput } from './FormInput';
import { FormTextArea } from './FormTextArea';
import { SuccessMessage } from './SuccessMessage';
import { validateEmail, validateName, validateMessage, validatePhone } from '@/utils/validation';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return validateName(value) ? '' : 'يجب أن يحتوي الاسم على حرفين على الأقل';
      case 'email':
        return validateEmail(value) ? '' : 'البريد الإلكتروني غير صحيح';
      case 'phone':
        return value === '' || validatePhone(value) ? '' : 'رقم الهاتف غير صحيح (يجب أن يبدأ بـ +20)';
      case 'message':
        return validateMessage(value) ? '' : 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API validation errors
        if (data.error) {
          setErrors({ submit: data.error });
        } else {
          setErrors({ submit: 'حدث خطأ أثناء إرسال النموذج' });
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error('حدث خطأ أثناء إرسال النموذج:', error);
      setErrors({ submit: 'حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="الاسم الكامل"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          required
          placeholder="أدخل اسمك الكامل"
        />

        <FormInput
          label="البريد الإلكتروني"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          required
          placeholder="example@domain.com"
          dir="ltr"
        />

        <FormInput
          label="رقم الهاتف"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          placeholder="+20"
          dir="ltr"
        />

        <FormInput
          label="الموضوع"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="موضوع الرسالة"
        />

        <FormTextArea
          label="الرسالة"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.message}
          required
          placeholder="اكتب رسالتك هنا..."
          rows={5}
        />

        {errors.submit && (
          <div className="text-red-500 text-sm text-center mt-2">
            {errors.submit}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            flex items-center justify-center w-full px-4 py-2 
            bg-sky-500 text-white rounded-md mt-36
            hover:bg-sky-600 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-sky-500
            transition duration-150 ease-in-out
            ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جاري الإرسال...
            </span>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              إرسال الرسالة
            </>
          )}
        </button>
      </form>

      {showSuccess && (
        <SuccessMessage
          message="تم استلام رسالتك بنجاح. سنقوم بالرد عليك في أقرب وقت ممكن."
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}