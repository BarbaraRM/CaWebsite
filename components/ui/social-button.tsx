import type React from "react";

export function SocialButton({
  icon,
  href,
}: {
  icon: React.ReactNode;
  href: string | undefined;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className="w-5.5 h-5.5 rounded-full border border-[#6b6f7b] flex items-center justify-center text-[#656575] hover:border-[#f29200] hover:text-[#f29200] p-[2px] "
    >
      {icon}
    </a>
  );
}
