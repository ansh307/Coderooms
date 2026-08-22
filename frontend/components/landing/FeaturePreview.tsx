export default function FeaturePreview() {
  return (
    <section className="w-full px-6 pb-32 pt-8 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1350px]">
        <div className="overflow-hidden rounded-2xl border border-border-color bg-primary-foreground shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
          {/* Light */}
          <img
            src="/feature-preview-image.png"
            alt="CodeRooms collaborative coding workspace"
            className="block h-auto w-full dark:hidden"
          />

          {/* Dark */}
          <img
            src="/feature-preview-image-dark.png"
            alt="CodeRooms collaborative coding workspace"
            className="hidden h-auto w-full dark:block"
          />
        </div>
      </div>
    </section>
  );
}
