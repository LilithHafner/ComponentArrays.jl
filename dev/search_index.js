var documenterSearchIndex = {"docs":
[{"location":"#ComponentArrays.jl-1","page":"Home","title":"ComponentArrays.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Modules = [ComponentArrays]","category":"page"},{"location":"#ComponentArrays.Axis","page":"Home","title":"ComponentArrays.Axis","text":"ax = Axis(nt::NamedTuple)\n\nAxes for named component access of CArrays. These are a little confusing and poorly     thought-out, so maybe don't use them directly.\n\nExamples\n\njulia> using ComponentArrays\n\njulia> ax = Axis(a=1, b=2:3, c=(4:10, (a=(1:3, (a=1, b=2:3)), b=4:7)))\nAxis{(a = 1, b = 2:3, c = (4:10, (a = (1:3, (a = 1, b = 2:3)), b = 4:7)))}()\n\njulia> A = [100, 4, 1.3, 1, 1, 4.4, 0.4, 2, 1, 45];\n\njulia> cvec = CArray(A, ax);\n\njulia> cmat = CArray(A .* A', ax, ax);\n\njulia> cmat[:c,:c] * cvec.c\n7-element Array{Float64,1}:\n  2051.52\n  2051.52\n  9026.688000000002\n   820.608\n  4103.04\n  2051.52\n 92318.4\n\n\n\n\n\n","category":"type"},{"location":"#ComponentArrays.CArray","page":"Home","title":"ComponentArrays.CArray","text":"x = CArray(nt::NamedTuple)\nx = CArray{T}(nt::NamedTuple) where {T}\n\nArray type that can be accessed like an arbitrary nested mutable struct.\n\nExamples\n\njulia> using ComponentArrays\n\njulia> x = CArray(a=1, b=[2, 1, 4], c=(a=2, b=[1, 2]))\nCArray{Float64}(a = 1.0, b = [2.0, 1.0, 4.0], c = (a = 2.0, b = [1.0, 2.0]))\n\njulia> x.c.a = 400; x\nCArray{Float64}(a = 1.0, b = [2.0, 1.0, 4.0], c = (a = 400.0, b = [1.0, 2.0]))\n\njulia> x[5]\n400.0\n\njulia> collect(x)\n7-element Array{Float64,1}:\n   1.0\n   2.0\n   1.0\n   4.0\n 400.0\n   1.0\n   2.0\n\n\n\n\n\n","category":"type"},{"location":"#ComponentArrays.fastindices-Tuple","page":"Home","title":"ComponentArrays.fastindices","text":"fastindices(i...)\n\nWrap CArray symbolic indices in Vals for type-stable indexing.\n\nExamples\n\njulia> using ComponentArrays, BenchmarkTools\n\njulia> ca = CArray(a=1, b=[2, 1, 4], c=(a=2, b=[1, 2]))\nCArray{Float64}(a = 1.0, b = [2.0, 1.0, 4.0], c = (a = 2.0, b = [1.0, 2.0]))\n\njulia> ca2 = ca .* ca'\n7×7 CArray{Tuple{Axis{(a = 1, b = 2:4, c = (5:7, (a = 1, b = 2:3)))},Axis{(a = 1, b = 2:4, c = (5:7, (a = 1, b = \n2:3)))}},Float64,2,Array{Float64,2}}:\n 1.0  2.0  1.0   4.0  2.0  1.0  2.0\n 2.0  4.0  2.0   8.0  4.0  2.0  4.0\n 1.0  2.0  1.0   4.0  2.0  1.0  2.0\n 4.0  8.0  4.0  16.0  8.0  4.0  8.0\n 2.0  4.0  2.0   8.0  4.0  2.0  4.0\n 1.0  2.0  1.0   4.0  2.0  1.0  2.0\n 2.0  4.0  2.0   8.0  4.0  2.0  4.0\n\njulia> _a, _b, _c = fastindices(:a, :b, :c)\n(Val{:a}(), Val{:b}(), Val{:c}())\n\njulia> @btime $ca2[:c,:c];\n  12.199 μs (2 allocations: 80 bytes)\n\njulia> @btime $ca2[$_c, $_c];\n  14.728 ns (2 allocations: 80 bytes)\n\n\n\n\n\n","category":"method"},{"location":"#ComponentArrays.getaxes-Tuple{CArray}","page":"Home","title":"ComponentArrays.getaxes","text":"getaxes(x::CArray)\n\nAccess .axes field of a CArray. This is different than axes(x::CArray), which     returns the axes of the contained array.\n\n\n\n\n\n","category":"method"},{"location":"#ComponentArrays.getdata-Tuple{CArray}","page":"Home","title":"ComponentArrays.getdata","text":"getdata(x::CArray)\n\nAccess .data field of a CArray, which contains the array that CArray wraps.\n\nExamples\n\njulia> using ComponentArrays\n\njulia> ax = Axis(a=1:3, b=(4:6, (a=1, b=2:3)))\nAxis{(a = 1:3, b = (4:6, (a = 1, b = 2:3)))}()\n\njulia> A = zeros(6,6);\n\njulia> ca = CArray(A, (ax, ax))\n6×6 CArray{Tuple{Axis{(a = 1:3, b = (4:6, (a = 1, b = 2:3)))},Axis{(a = 1:3, b = (4:6, (a = 1, b = 2:3)))}},Float64,2,Array{Float64,2}}:\n 0.0  0.0  0.0  0.0  0.0  0.0\n 0.0  0.0  0.0  0.0  0.0  0.0\n 0.0  0.0  0.0  0.0  0.0  0.0\n 0.0  0.0  0.0  0.0  0.0  0.0\n 0.0  0.0  0.0  0.0  0.0  0.0\n 0.0  0.0  0.0  0.0  0.0  0.0\n\njulia> getaxes(ca)\n(Axis{(a = 1:3, b = (4:6, (a = 1, b = 2:3)))}(), Axis{(a = 1:3, b = (4:6, (a = 1, b = 2:3)))}())\n\n\n\n\n\n","category":"method"}]
}
