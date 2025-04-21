import { useState } from 'react';

const OTP_API = 'https://otp-api-whatsapp.vercel.app/send';
const ADMIN_API = 'https://otp-api-whatsapp.vercel.app/view';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [otpList, setOtpList] = useState([]);
  const [viewAdmin, setViewAdmin] = useState(false);
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    const res = await fetch(OTP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const fetchOtps = async () => {
    const res = await fetch(ADMIN_API);
    const data = await res.json();
    setOtpList(data);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">WhatsApp OTP Login</h1>

      {!viewAdmin && (
        <>
          <input
            type="text"
            placeholder="Enter WhatsApp Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full rounded mb-2"
          />
          <button
            onClick={sendOtp}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Send OTP
          </button>
          {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
        </>
      )}

      <div className="mt-6">
        <button
          onClick={() => {
            if (!viewAdmin) fetchOtps();
            setViewAdmin(!viewAdmin);
          }}
          className="text-blue-600 underline"
        >
          {viewAdmin ? 'Go Back' : 'View Admin OTP Panel'}
        </button>
      </div>

      {viewAdmin && (
        <div className="mt-4 text-left">
          <h2 className="font-bold mb-2">Sent OTPs</h2>
          {otpList.length === 0 && <p>No OTPs sent yet.</p>}
          {otpList.map((otp, idx) => (
            <div key={idx} className="border p-2 mb-1 rounded">
              <strong>{otp.phone}</strong>: {otp.otp}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
