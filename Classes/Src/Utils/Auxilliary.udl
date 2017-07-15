Include %occStatus

Class Src.Utils.Auxilliary [ Abstract ]
{

/// Бросает исключение, если результат не 1
ClassMethod ThrowIfError(sc As %Status)
{
	if ($$$ISOK(sc)) return
	do ..ThrowStatus(sc)
}

/// Бросает исключение с заданным текстом
ClassMethod ThrowString(string As %String)
{
	do ..ThrowStatus($$$ERROR($$$GeneralError, string))
}

ClassMethod ThrowStatus(sc As %Status)
{
	do ..Throw(##class(%Exception.StatusException).CreateFromStatus(sc))
}

ClassMethod Throw(ex As %Exception.AbstractException)
{
	set ^||errInfo("hasError") = 1
	set ^||errInfo($i(^||errInfo))=$zu(41)
	For level=1:1:$zu(41) {
		set ^||errInfo(^||errInfo,level) = $zu(41,level)
		set key = $zu(42,level,"")
		while (key'=""){
			if ($zu(41,level,key)=level){
				set ^||errInfo(^||errInfo,level,key)=$zu(43,level,key)
			}
			set key = $zu(42,level,key)
		}
	}
	throw ex
}

/// Проверяет, является ли строка substring префиксом строки string
ClassMethod IsPrefix(string As %String, substring As %String) As %Boolean [ CodeMode = expression ]
{
$e(string,1,$l(substring))=substring
}

/// Удаляет префикс prefix из строки string.
/// Если строка не содержит префикс, то бросает исключение.
ClassMethod DeletePrefix(string As %String, prefix As %String) As %String
{
	if ('..IsPrefix(string, prefix)) do ..ThrowString("Невозможно удалить '"_prefix_"' из строки '"_string_"'")
	return $e(string,$l(prefix)+1,*)
}

}

