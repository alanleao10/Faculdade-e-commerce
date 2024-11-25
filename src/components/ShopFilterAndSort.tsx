import { useAppSelector } from "../hooks";

const ShopFilterAndSort = ({
  sortCriteria,
  setSortCriteria,
}: {
  sortCriteria: string;
  setSortCriteria: (value: string) => void;
}) => {
  const { showingProducts, totalProducts } = useAppSelector(state => state.shop)
  return (
    <div className="flex justify-between items-center px-5 max-sm:flex-col max-sm:gap-5">
      <p className="text-lg">Mostrando 1–{ showingProducts } of { totalProducts } resultados</p>
      <div className="flex gap-3 items-center">
        <p>Ordenar por:</p>
        <div className="relative">
          <select
            className="border border-[rgba(0,0,0,0.40)] px-2 py-1"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortCriteria(e.target.value)
            }
            value={sortCriteria}
          >
            <option value="default">Padrão</option>
            <option value="popularity">Popularidade</option>
            <option value="price-asc">Preço: baixo a alto</option>
            <option value="price-desc">Preço: alto a baixo</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default ShopFilterAndSort;
