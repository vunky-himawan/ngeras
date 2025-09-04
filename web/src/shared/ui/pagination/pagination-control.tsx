import { useResponsive } from "@/shared/hooks/use-responsive";
import type { IPaginationMeta } from "@/shared/types/query-params";
import { Button } from "../button";
import { Pagination, PaginationContent, PaginationItem } from "./pagination";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface Props {
  onPaginationChange: (page: number, per_page: number) => void;
  paginationMeta: IPaginationMeta;
}

export const PaginationControl = ({ onPaginationChange, paginationMeta }: Props) => {
  const { page, page_size, total, total_pages } = paginationMeta;
  const { isLg } = useResponsive();

  const pageRange = !isLg ? 1 : 2;
  const start = (page - 1) * page_size + 1;
  const end = Math.min(start + page_size - 1, total);

  const generatePageNumbers = (): (number | string)[] => {
    const maxVisiblePages = !isLg ? 3 : 6;
    if (total_pages <= maxVisiblePages) {
      return Array.from({ length: total_pages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    if (page <= pageRange + 1) {
      pages.push(...Array.from({ length: pageRange + 2 }, (_, i) => i + 1), "...");
    } else if (page >= total_pages - pageRange) {
      pages.push(
        "...",
        ...Array.from({ length: pageRange + 2 }, (_, i) => total_pages - pageRange - 1 + i),
      );
    } else {
      pages.push("...", page - pageRange, page, page + pageRange, "...");
    }
    return pages;
  };

  const handleEllipsisClick = (index: number) => {
    const isFirstEllipsis = index === 0;
    const jumpAmount = Math.floor(total_pages / 3);
    const newPage = isFirstEllipsis
      ? Math.max(1, page - jumpAmount)
      : Math.min(total_pages, page + jumpAmount);
    onPaginationChange(newPage, page_size);
  };

  const renderPageButton = (page: number | string, index: number) => {
    if (typeof page === "number") {
      return (
        <Button
          variant={page === page ? "default" : "outline"}
          className="h-8 w-8"
          onClick={() => onPaginationChange(page, page_size)}
        >
          {page}
        </Button>
      );
    }
    return (
      <Button variant="outline" className="h-8 w-8" onClick={() => handleEllipsisClick(index)}>
        {page}
      </Button>
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row lg:justify-end">
        <Pagination className="md:justify-end w-full">
          <PaginationContent className="flex-col md:flex-row gap-3 items-center justify-end">
            <p>{`${start}-${end} of ${total}`}</p>
            {/* Tombol kembali ke halaman pertama */}
            <div className="flex flex-wrap">
              <PaginationItem>
                <Button
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => onPaginationChange(1, page_size)}
                  disabled={page === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                {/* Tombol untuk ke halaman sebelumnya */}
                <Button
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => onPaginationChange(page - 1, page_size)}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </PaginationItem>
              {/* Tombol-tombol halaman */}
              {generatePageNumbers().map((page, index) => (
                <PaginationItem key={index}>{renderPageButton(page, index)}</PaginationItem>
              ))}
              <PaginationItem>
                {/* Tombol untuk ke halaman berikutnya */}
                <Button
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => onPaginationChange(page + 1, page_size)}
                  disabled={page === total_pages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
              {/* Tombol ke halaman terakhir */}
              <PaginationItem>
                <Button
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => onPaginationChange(total_pages, page_size)}
                  disabled={page === total_pages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </div>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
