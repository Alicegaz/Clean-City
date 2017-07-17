Include Src.Utils.Macro

Class Src.Utils.SourceControl Extends %Studio.SourceControl.Base [ ClassType = "", ProcedureBlock ]
{

Parameter SETTINGS = {"^"_%class};

/// Convert the internal name, e.g. TEST.MAC to an external name that is used to export
/// the routine/class/csp item. This is often a filename to write the file out to.
Method ExternalName(InternalName As %String) As %String
{
    if ('$Data(@..#SETTINGS)) return ""
    if ('$get(@..#SETTINGS@("Path"))="") return ""
    Set name=$p(InternalName,".",1,$l(InternalName,".")-1),
    ext=$p(InternalName,".",$l(InternalName,".")),
    ext=$zcvt(ext,"u")
    If ( name="" ) return ""
    If ( (ext="CLS") || (ext="PKG") ) {
        set path = ##class(%File).SubDirectoryName(@..#SETTINGS@("Path"), "Classes")
    }
    elseif ( ext="INC" ) {
        set path = ##class(%File).SubDirectoryName(@..#SETTINGS@("Path"), "Include")
    }
    else {
        return ""
    }
    for i=1:1:$l(name,".")
    {
        set path = ##class(%File).SubDirectoryName(path, $p(name,".",i))
    }
    
    If ( ext'="PKG" ) {
        set path = path_".udl"
    }
    return path
}

/// Return information about this entity.
Method GetStatus(InternalName As %String, ByRef IsInSourceControl As %Boolean, ByRef Editable As %Boolean, ByRef IsCheckedOut As %Boolean, ByRef UserCheckedOut As %String) As %Status
{
    Set Editable=1,IsCheckedOut=0,UserCheckedOut="",IsInSourceControl=1
    Quit $$$OK
}

/// Return 1 if you wish this item to appear as if it is 'generated' when opened in Studio,
/// return 0 to force this item not to appear as 'generated' and return "" to use normal processing
ClassMethod IsGenerated(Name As %String) As %String
{
    Quit ""
}

/// Return true if this item should be marked as read only.
/// This is called when Studio opens a document. It is set to indicate
/// that the user checked the 'read only' checkbox in the open
/// dialog in Studio.
Method IsReadOnly(InternalName As %String) As %Boolean
{
    Quit ..IsGenerated(InternalName)=1
}

/// Called before an item is deleted. Returning an error code prevents the delete from occuring.
Method OnBeforeDelete(InternalName As %String) As %Status
{
    Quit $$$OK
}

/// This is called before the actual load of data to give the chance
/// to load the item from an external format.
Method OnBeforeLoad(InternalName As %String) As %Status
{
    try{
        do ..Load(InternalName)
        return $$$OK
    }
    catch ex{
        return ex.AsStatus()
    }
}

/// Export the routine/class/csp file to the external format.
/// This is called after the item has been saved to the database.
Method OnAfterSave(InternalName As %String, Object As %RegisteredObject = {$$$NULLOREF}) As %Status
{
    try{
        do ..Save(InternalName)
        return $$$OK
    }
    catch ex{
        return ex.AsStatus()
    }
}

ClassMethod MakePath(filename As %String) [ Private ]
{
    Set dir=##class(%File).GetDirectory(filename)
    if ('##class(%File).CreateDirectoryChain(dir)) $$$throw("Cannot create directory '"_dir_"'")
}

/// Get the latest version of this file from source control.
Method GetLatest(InternalName As %String) As %Status
{
    try{
        do ..Load(InternalName)
        return $$$OK
    }
    catch ex{
        return ex.AsStatus()
    }
}

Method Load(InternalName As %String)
{
    Set filename=..ExternalName(InternalName)
    If filename="" Return $$$OK
    If ('##class(%File).Exists(filename)) { 
        Write:'$get(@..#SETTINGS@("nodisplay")) !,"File '",filename,"' not found, skipping import" 
        Return
    }
    If (##class(%File).DirectoryExists(filename)) {
        $$$do($system.OBJ.ImportDir(filename,,,,$$$YES))
    }
    else {
        If (##class(%File).GetFileDateModified(filename)=$get(@..#SETTINGS@("FileTimeStamp",InternalName))) {
            Write:'$get(@..#SETTINGS@("nodisplay")) !,"File '",filename,"' is up to date, skipping import" 
            Return
        }
        $$$do($system.OBJ.Load(filename))
    }
    Write:'$get(@..#SETTINGS@("nodisplay")) !,"Imported '",InternalName,"' from file '",filename,"'"
    Set @..#SETTINGS@("FileTimeStamp",InternalName)=##class(%File).GetFileDateModified(filename)
}

Method Save(InternalName As %String)
{
    Set filename=..ExternalName(InternalName)
    If filename="" return $$$OK
    Set name=$Piece(InternalName,".",1,$Length(InternalName,".")-1)
    Set ext=$ZConvert($Piece(InternalName,".",$Length(InternalName,".")),"U")
    If ('##class(%File).Exists(filename)) Do ..MakePath(filename)
    $$$do($system.OBJ.ExportUDL(InternalName,filename,"/diffexport"))
    Write:'$get(@..#SETTINGS@("nodisplay")) !,"Exported '",InternalName,"' to file '",filename,"'"
    Set @..#SETTINGS@("FileTimeStamp",InternalName)=##class(%File).GetFileDateModified(filename)
}

ClassMethod Init(path As %String)
{
    set @##class(Src.Utils.SourceControl).#SETTINGS@("Path") = path
}

}

