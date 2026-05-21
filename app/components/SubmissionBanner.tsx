import review from '../mocks/review_mock.json';

const SubmissionBanner = () => {
  return (
    <div className="bg-zinc-50 p-1">
      <main className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-black">Document review</p>

          <h1 className="mt-2 text-3xl text-black font-bold">{review.name}</h1>

          <div className="mt-4 flex gap-4 text-sm text-black">
            <span>Version {review.version}</span>
            <span>Status: {review.status}</span>
            <span>
              Uploaded by {review.user.first_name} {review.user.last_name}
            </span>
          </div>
        </header>
      </main>
    </div>
  );
};

export default SubmissionBanner;
