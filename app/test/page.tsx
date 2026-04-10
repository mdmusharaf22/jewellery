import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Test Page</h1>
        <Link 
          href="/" 
          className="inline-block bg-[#B8941E] text-white px-8 py-3 rounded hover:bg-black transition"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
