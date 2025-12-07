interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="py-4 mt-4">
      <h2 className="text-section text-center">{title}</h2>
    </div>
  );
}
